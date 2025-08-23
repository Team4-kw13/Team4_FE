import { useEffect, useState } from 'react'

import { useOcrAnalysis } from './useOcrAnalysis'
import { useTranslation } from './useTranslation'

export const useFetchOcrTranslationData = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { fetchOcrData } = useOcrAnalysis()
  const { fetchTranslationData } = useTranslation()

  useEffect(() => {
    setIsLoading(true)

    fetchOcrData()
      .then((ocr) => fetchTranslationData(ocr))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [fetchOcrData, fetchTranslationData])
  return { isLoading }
}
