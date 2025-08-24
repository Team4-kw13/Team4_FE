import { useCallback } from 'react'

// import { PROMPT_HIGHLIGHT } from '../constants/prompt'
// import { requestOpenAI } from '../services/gpt'
import { useDocumentAnalysisActions } from '@/stores/DocumentAnalysisStore'

import { PROMPT_HIGHLIGHT } from '../constants/prompt'
import { requestOpenAI } from '../services/gpt'

/**
 * 하이라이트 생성 훅
 *
 * @returns {{ fetchHighlightStaged: (translationData: Record<'page1'|'page2'|'page3', string[]>) => Promise<void> }}
 */
export const useHighlight = () => {
  const { setHighlightedTextPage, handleAfterFetch } = useDocumentAnalysisActions()

  const fetchHighlightPage = useCallback(
    async (pageKey, texts) => {
      const prompt = `${PROMPT_HIGHLIGHT}\n- 반드시 다음 스키마로만 응답: {"${pageKey}": string[]}`

      const res = await requestOpenAI(prompt, { [pageKey]: texts })
      const result = res?.[pageKey] ?? []
      setHighlightedTextPage(pageKey, result)
      return result
    },
    [setHighlightedTextPage],
  )

  const fetchHighlightStaged = useCallback(
    async (translationData) => {
      const pages = {
        page1: translationData.page1 ?? [],
        page2: translationData.page2 ?? [],
        page3: translationData.page3 ?? [],
      }

      const p1 = fetchHighlightPage('page1', pages.page1)
      const p2 = fetchHighlightPage('page2', pages.page2)
      const p3 = fetchHighlightPage('page3', pages.page3)

      await p1

      Promise.allSettled([p2, p3]).finally(() => handleAfterFetch('page2'))
    },
    [fetchHighlightPage, handleAfterFetch],
  )

  return { fetchHighlightStaged }
}
