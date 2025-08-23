import { useEffect, useState } from 'react'

import instance from '@/api/client'
import { useDocumentHistoryActions } from '@/stores/DocumentHistoryStore'

export const useFetchHistoryData = (contractId) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const { setHistoryData } = useDocumentHistoryActions()

  useEffect(() => {
    setIsLoading(true)

    const fetchHistoryData = async () => {
      try {
        const response = await instance.get(`/api/contracts/${contractId}`)
        setHistoryData(response.data)
      } catch (e) {
        setIsError(e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistoryData()
  }, [contractId, setHistoryData])

  return { isLoading, isError }
}
