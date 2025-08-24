import { useEffect, useState } from 'react'

import {
  createOcrFormData,
  normalizeOcrData,
  requestOcr,
} from '@/features/contract-analysis/utils/ocr'
import { useUploadedImages } from '@/hooks/useUploadedImages'
import { useDocumentAnalysisActions } from '@/stores/DocumentAnalysisStore'

import { useTranslation } from './useTranslation'

export const useFetchOcrTranslationData = () => {
  // const [isLoading, setIsLoading] = useState(false)
  // const { fetchOcrData } = useOcrAnalysis()
  // const { fetchTranslationData } = useTranslation()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true)
  //     try {
  //       const ocr = await fetchOcrData()
  //       await fetchTranslationData(ocr)
  //     } catch (e) {
  //       console.error(e)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, [fetchOcrData, fetchTranslationData])

  // return { isLoading }

  const [isFirstPageReady, setIsFirstPageReady] = useState(false)

  const { items } = useUploadedImages()
  const { setOcrPage } = useDocumentAnalysisActions()
  const { fetchTranslationPage } = useTranslation()

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      if (!items?.length) return

      const req = (file, tid) => requestOcr(createOcrFormData(file, tid))
      const list = [
        { file: items[0]?.file, tid: import.meta.env.VITE_CLOVA_TEMPLATE_ID1 }, // page1 구성 요소
        { file: items[1]?.file, tid: import.meta.env.VITE_CLOVA_TEMPLATE_ID2 }, // page2-1
        { file: items[1]?.file, tid: import.meta.env.VITE_CLOVA_TEMPLATE_ID3 }, // page2-2
        { file: items[2]?.file, tid: import.meta.env.VITE_CLOVA_TEMPLATE_ID4 }, // page3-1
        { file: items[2]?.file, tid: import.meta.env.VITE_CLOVA_TEMPLATE_ID5 }, // page3-2
      ]

      const p0 = req(list[0].file, list[0].tid)
      const p12 = Promise.all([req(list[1].file, list[1].tid), req(list[2].file, list[2].tid)]) // page2
      const p34 = Promise.all([req(list[3].file, list[3].tid), req(list[4].file, list[4].tid)]) // page3

      p0.then(async (r0) => {
        if (cancelled) return
        const page1 = normalizeOcrData(r0.images[0].fields)
        setOcrPage('page1', page1)
        await fetchTranslationPage(
          'page1',
          page1.map((v) => v.text),
        )
        if (!cancelled) setIsFirstPageReady(true)
      }).catch(console.error)

      p12
        .then(async ([r1, r2]) => {
          if (cancelled) return
          const page2 = normalizeOcrData([...r1.images[0].fields, ...r2.images[0].fields])
          setOcrPage('page2', page2)
          await fetchTranslationPage(
            'page2',
            page2.map((v) => v.text),
          )
        })
        .catch(console.error)

      p34
        .then(async ([r3, r4]) => {
          if (cancelled) return
          const page3 = normalizeOcrData([...r3.images[0].fields, ...r4.images[0].fields])
          setOcrPage('page3', page3)
          await fetchTranslationPage(
            'page3',
            page3.map((v) => v.text),
          )
        })
        .catch(console.error)
    })()

    return () => {
      cancelled = true
    }
  }, [items, setOcrPage, fetchTranslationPage])

  return { isLoading: !isFirstPageReady }
}
