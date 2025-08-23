import { useDocumentAnalysisContext } from '@/stores/useDocumentAnalysisContext'

import { PROMPT_SUMMARY } from '../constants/prompt'
import { requestOpenAI } from '../services/gpt'

export const useSummary = () => {
  const {
    actions: { saveSummary, handleAfterFetch },
  } = useDocumentAnalysisContext()

  const fetchSummaryData = async (translationData) => {
    // const response = SUMMARY_DUMMY_DATA
    const response = await requestOpenAI(PROMPT_SUMMARY, translationData)

    console.log(response)
    saveSummary(response)
    handleAfterFetch('page3')
  }

  return { fetchSummaryData }
}
