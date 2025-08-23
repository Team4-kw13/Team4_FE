import { useCallback } from 'react'

import { useDocumentAnalysisActions } from '@/stores/DocumentAnalysisStore'

import { PROMPT_HIGHLIGHT } from '../constants/prompt'
import { requestOpenAI } from '../services/gpt'

export const useHighlight = () => {
  const { setHighlightedTextByPage, handleAfterFetch } = useDocumentAnalysisActions()

  const fetchHighlightData = useCallback(
    async (translationData) => {
      const pages = {
        page1: translationData.page1,
        page2: translationData.page2,
        page3: translationData.page3,
      }

      const PAGE_KEYS = ['page1', 'page2', 'page3']

      const pagePromises = PAGE_KEYS.map(async (pageKey) => {
        const prompt = `${PROMPT_HIGHLIGHT}\n- 반드시 다음 스키마로만 응답: {"${pageKey}": string[]}`
        const response = await requestOpenAI(prompt, { [pageKey]: pages[pageKey] })
        return [pageKey, response[pageKey]]
      })

      const settled = await Promise.all(pagePromises)
      const merged = settled.reduce((acc, [k, arr]) => ({ ...acc, [k]: arr }), {
        page1: [],
        page2: [],
        page3: [],
      })
      setHighlightedTextByPage(merged)
      handleAfterFetch('page2')
    },
    [setHighlightedTextByPage, handleAfterFetch],
  )

  return { fetchHighlightData }
}
