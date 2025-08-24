import { useCallback } from 'react'

import { useDocumentAnalysisActions } from '@/stores/DocumentAnalysisStore'

import { PROMPT_SUMMARY } from '../constants/prompt'
import { requestOpenAI } from '../services/gpt'

export const useSummary = () => {
  const { saveSummary, handleAfterFetch } = useDocumentAnalysisActions()

  const fetchSummaryData = useCallback(
    async (translationData) => {
      const response = await requestOpenAI(PROMPT_SUMMARY, translationData)

      saveSummary(response)
      handleAfterFetch('page3')
    },
    [saveSummary, handleAfterFetch],
  )

  return { fetchSummaryData }
}
