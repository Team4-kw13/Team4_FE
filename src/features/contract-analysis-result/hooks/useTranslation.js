import { useCallback } from 'react'

import { TRANSLATION_DUMMY_DATA } from '@/constants/dummy'
import { useDocumentAnalysisActions } from '@/stores/DocumentAnalysisStore'

export const useTranslation = () => {
  const { setTranslationByPage } = useDocumentAnalysisActions()

  const fetchTranslationData = useCallback(
    async (ocrData) => {
      const pages = {
        page1: (ocrData.page1 ?? []).map((v) => v.text),
        page2: (ocrData.page2 ?? []).map((v) => v.text),
        page3: (ocrData.page3 ?? []).map((v) => v.text),
      }

      const PAGE_KEYS = ['page1', 'page2', 'page3']
      // const pagePromises = PAGE_KEYS.map(async (pageKey) => {
      //   const prompt = `${PROMPT_TRANSLATE}\n- 반드시 다음 스키마로만 응답: {"${pageKey}": string[]}`
      //   const res = await requestOpenAI(prompt, { [pageKey]: pages[pageKey] })
      //   return [pageKey, res[pageKey]]
      // })

      // const settled = await Promise.all(pagePromises)
      // const merged = settled.reduce((acc, [k, arr]) => ({ ...acc, [k]: arr }), {
      //   page1: [],
      //   page2: [],
      //   page3: [],
      // })
      const merged = TRANSLATION_DUMMY_DATA
      setTranslationByPage(merged)
      return merged
    },
    [setTranslationByPage],
  )

  return { fetchTranslationData }
}
