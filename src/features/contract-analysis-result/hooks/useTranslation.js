import { useCallback } from 'react'

import { useDocumentAnalysisActions } from '@/stores/DocumentAnalysisStore'

import { PROMPT_TRANSLATE } from '../constants/prompt'
import { requestOpenAI } from '../services/gpt'

export const useTranslation = () => {
  const { setTranslationPage } = useDocumentAnalysisActions()

  const fetchTranslationPage = useCallback(
    async (pageKey, texts) => {
      const prompt = `${PROMPT_TRANSLATE}\n- 반드시 다음 스키마로만 응답: {"${pageKey}": string[]}`
      const res = await requestOpenAI(prompt, { [pageKey]: texts })
      const translated = res?.[pageKey] ?? []
      setTranslationPage(pageKey, translated)
      return translated
    },
    [setTranslationPage],
  )

  return { fetchTranslationPage }
}
