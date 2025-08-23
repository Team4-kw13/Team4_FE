import { useCallback } from 'react'

import { SUMMARY_DUMMY_DATA } from '@/constants/dummy'
import { useDocumentAnalysisActions } from '@/stores/DocumentAnalysisStore'

export const useSummary = () => {
  const { saveSummary, handleAfterFetch } = useDocumentAnalysisActions()

  const fetchSummaryData = useCallback(
    async (translationData) => {
      const response = SUMMARY_DUMMY_DATA

      // const response = await requestOpenAI(PROMPT_SUMMARY, translationData)

      saveSummary(response)
      handleAfterFetch('page3')
    },
    [saveSummary, handleAfterFetch],
  )

  return { fetchSummaryData }
}
