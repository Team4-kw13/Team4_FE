import { useEffect, useState } from 'react'

import { useAnalysisResultCurrentStep } from '@/stores/AnalysisResultStep'
import { useIsNeedFetch, useTranslationByPage } from '@/stores/DocumentAnalysisStore'

import { useHighlight } from './useHighlight'

export const useFetchHighlightData = () => {
  const translationByPage = useTranslationByPage()
  const isNeedFetch = useIsNeedFetch()
  const currentStep = useAnalysisResultCurrentStep()
  const { fetchHighlightStaged } = useHighlight()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const ready =
      translationByPage &&
      ['page1', 'page2', 'page3'].every((k) => Array.isArray(translationByPage[k]))

    if (currentStep === 2 && isNeedFetch.page2 && ready) {
      let cancelled = false
      setIsLoading(true)

      fetchHighlightStaged(translationByPage)
        .catch(console.error)
        .finally(() => {
          if (!cancelled) setIsLoading(false)
        })

      return () => {
        cancelled = true
      }
    }
  }, [currentStep, isNeedFetch.page2, translationByPage, fetchHighlightStaged])

  return { isLoading }
}
