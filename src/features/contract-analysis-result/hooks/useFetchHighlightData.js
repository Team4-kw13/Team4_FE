import { useEffect, useState } from 'react'

import { useAnalysisResultCurrentStep } from '@/stores/AnalysisResultStep'
import { useIsNeedFetch, useTranslationByPage } from '@/stores/DocumentAnalysisStore'

import { useHighlight } from './useHighlight'

export const useFetchHighlightData = () => {
  const translationByPage = useTranslationByPage()
  const isNeedFetch = useIsNeedFetch()

  const [isLoading, setIsLoading] = useState(false)

  const { fetchHighlightData } = useHighlight()
  const currentStep = useAnalysisResultCurrentStep()

  useEffect(() => {
    if (currentStep === 2 && isNeedFetch['page2'] && translationByPage) {
      setIsLoading(true)
      fetchHighlightData(translationByPage)
        .catch(console.error)
        .finally(() => setIsLoading(false))
    }
  }, [currentStep, isNeedFetch, translationByPage, fetchHighlightData])

  return { isLoading }
}
