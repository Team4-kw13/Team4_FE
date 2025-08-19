import { useCallback, useEffect, useRef, useState } from 'react'

import { useInfiniteScroll } from '@/features/list-contract/hooks/useInfiniteScroll'
import { fetchContracts } from '@/features/list-contract/services/contractsApi'

import ListContractItem from './ListContractItem'

import styles from './ListContractList.module.css'

export const ListContractList = () => {
  const [items, setItems] = useState([])
  const [cursor, setCursor] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 동시 호출 방지
  const fetchingRef = useRef(false)
  // 스크롤 컨테이너
  const containerRef = useRef(null)

  const loadMore = useCallback(async () => {
    if (fetchingRef.current || loading || !hasMore) return

    fetchingRef.current = true
    try {
      setLoading(true)
      setError('')

      const { items: page, nextCursor } = await fetchContracts({ cursor, limit: 10 })

      // id 기준 중복 제거 병합
      setItems((prev) => {
        const merged = [...prev, ...page]
        return Array.from(new Map(merged.map((it) => [it.id, it])).values())
      })

      if (nextCursor != null) setCursor(nextCursor)
      else setHasMore(false)
    } catch {
      setError('목록을 불러오는 중 오류가 발생했어요.')
    } finally {
      setLoading(false)
      fetchingRef.current = false
    }
  }, [cursor, hasMore, loading])

  useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sentinelRef = useInfiniteScroll(loadMore, {
    root: containerRef.current,
    rootMargin: '240px',
    enabled: hasMore && !loading,
  })

  return (
    <div ref={containerRef} className={styles.container}>
      {items.map((c) => (
        <ListContractItem
          key={`contract-${c.id}`}
          contractId={c.id}
          title={c.title}
          description={c.description}
        />
      ))}

      {loading && (
        <>
          <div className={styles.skeleton} />
          <div className={styles.skeleton} />
        </>
      )}

      {error && (
        <button className={styles.retry} onClick={loadMore}>
          {error} 다시 시도
        </button>
      )}

      {!hasMore && !loading && items.length > 0 && (
        <div className={styles.end}>모든 계약서를 확인했어요</div>
      )}

      <div ref={sentinelRef} className={styles.sentinel} />
    </div>
  )
}

export default ListContractList
