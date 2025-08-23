import { useEffect, useState } from 'react'

import { useAnalysisResultCurrentStep } from '@/stores/AnalysisResultStep'
import { useIsNeedFetch, useTranslationByPage } from '@/stores/DocumentAnalysisStore'

import { useSummary } from './useSummary'

export const useFetchSummaryData = () => {
  const [isLoading, setIsLoading] = useState(false)

  const currentStep = useAnalysisResultCurrentStep()
  const { fetchSummaryData } = useSummary()

  const translationByPage = useTranslationByPage()
  const isNeedFetch = useIsNeedFetch()

  useEffect(() => {
    if (currentStep === 3 && isNeedFetch['page3'] && translationByPage) {
      setIsLoading(true)
      fetchSummaryData(translationByPage)
        .catch(console.error)
        .finally(() => setIsLoading(false))
    }
  }, [currentStep, isNeedFetch, translationByPage, fetchSummaryData])

  return { isLoading }
}
