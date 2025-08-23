import { useCallback, useState } from 'react'

import instance from '@/api/client'

export function useMypage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await instance.get('/api/members/mypage')
      const payload = res?.data ?? null
      setData(payload)
      return payload
    } catch (e) {
      setError(e)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, refetch }
}
