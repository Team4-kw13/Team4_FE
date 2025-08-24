import { useCallback, useEffect, useRef, useState } from 'react'

import instance from '@/api/client'

/**
 * 계약서 리스트 무한스크롤 훅
 * - API: GET /api/contracts/{page}  (0부터 시작)
 * - 응답: { success, statusCode, message, data: { contracts, hasNext } }
 * - items는 서버 스키마 그대로 유지: { contractId, contractName, createdDate }
 */
export function useListContract() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 스크롤 컨테이너/센티넬
  const containerRef = useRef(null)
  const sentinelRef = useRef(null)

  // 중복 호출/초기 이중 호출 가드
  const fetchingRef = useRef(false)
  const didInitRef = useRef(false)

  const loadMore = useCallback(async () => {
    if (fetchingRef.current || loading || !hasNext) return
    fetchingRef.current = true
    setLoading(true)
    setError(null)
    try {
      const res = await instance.get(`/api/contracts/${page}`, {
        headers: { Accept: 'application/json' },
      })
      const payload = res?.data ?? {}
      const contracts = payload.contracts ?? []
      const next = !!payload.hasNext

      // contractId 기준 중복 제거
      setItems((prev) => {
        const merged = [...prev, ...contracts]
        const map = new Map(merged.map((c) => [c.contractId, c]))
        return Array.from(map.values())
      })

      setHasNext(next)
      if (next) setPage((p) => p + 1)
    } catch (e) {
      if (e?.response?.status === 404) setHasNext(false)
      setError(e)
    } finally {
      setLoading(false)
      fetchingRef.current = false
    }
  }, [page, hasNext, loading])

  // 최초 1회만 로드(개발모드 StrictMode 이중 호출 방지)
  useEffect(() => {
    if (didInitRef.current) return
    didInitRef.current = true
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 센티넬: 첫 페이지 로드 이후에만 활성화(초기 중복 방지)
  useEffect(() => {
    const enabled = page > 0 && hasNext && !loading && !error
    if (!enabled) return
    const el = sentinelRef.current
    if (!el) return

    const io = new IntersectionObserver((entries) => entries[0].isIntersecting && loadMore(), {
      root: containerRef.current,
      rootMargin: '240px',
      threshold: 1,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [page, hasNext, loading, error, loadMore])

  const reset = useCallback(() => {
    setItems([])
    setPage(0)
    setHasNext(true)
    setError(null)
    didInitRef.current = false
  }, [])

  return { items, hasNext, loading, error, loadMore, reset, containerRef, sentinelRef }
}
