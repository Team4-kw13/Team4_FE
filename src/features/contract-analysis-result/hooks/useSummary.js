import { useState } from 'react'

import { useDocumentAnalysisContext } from '@/stores/useDocumentAnalysisContext'

import { PROMPT_SUMMARY } from '../constants/prompt'
import { requestOpenAI } from '../services/gpt'

export const useSummary = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    actions: { saveSummary, handleAfterFetch },
  } = useDocumentAnalysisContext()

  const fetchSummaryData = async (translationData) => {
    // const response = SUMMARY_DUMMY_DATA

    setIsLoading(true)
    const response = await requestOpenAI(PROMPT_SUMMARY, translationData)
    setIsLoading(false)

    console.log(response)
    saveSummary(response)
    handleAfterFetch('page3')
  }

  return { isLoading, fetchSummaryData }
}
