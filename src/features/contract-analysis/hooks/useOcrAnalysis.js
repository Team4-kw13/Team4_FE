import { useDocumentAnalysisContext } from '@/stores/useDocumentAnalysisContext'

import { OCR_DUMMY } from '../constants/dummy'

import { useUploadedImages } from './useUploadedImages'

/**
 * OCR 분석 훅
 *
 * - 업로드된 이미지들을 기반으로 OCR API 호출 및 결과 저장
 * - DocumentAnalysisContext의 setOcrPage로 페이지별 결과를 전역 상태에 반영
 *
 * @returns {{ fetchOcrData: () => Promise<void> }}
 */
export const useOcrAnalysis = () => {
  const { items } = useUploadedImages()
  const {
    actions: { setOcrPage },
  } = useDocumentAnalysisContext()

  const imageList = [
    { file: items[0]?.file, templateId: import.meta.env.VITE_CLOVA_TEMPLATE_ID1 },
    { file: items[1]?.file, templateId: import.meta.env.VITE_CLOVA_TEMPLATE_ID2 },
    { file: items[1]?.file, templateId: import.meta.env.VITE_CLOVA_TEMPLATE_ID3 },
    { file: items[2]?.file, templateId: import.meta.env.VITE_CLOVA_TEMPLATE_ID4 },
    { file: items[2]?.file, templateId: import.meta.env.VITE_CLOVA_TEMPLATE_ID5 },
  ]

  const fetchOcrData = async () => {
    if (!items?.length) {
      throw new Error('업로드된 파일이 없습니다.')
    }

    // const tasks = imageList.map(({ file, templateId }) => {
    //   if (!(file instanceof File)) {
    //     throw new Error(`파일 형식이 올바르지 않습니다.`)
    //   }
    //   const formData = createOcrFormData(file, templateId)
    //   return requestOcr(formData)
    // })

    // const results = await Promise.all(tasks)

    // const ocrData = {
    //   page1: normalizeOcrData(results[0].images[0].fields),
    //   page2: normalizeOcrData([...results[1].images[0].fields, ...results[2].images[0].fields]),
    //   page3: normalizeOcrData([...results[3].images[0].fields, ...results[4].images[0].fields]),
    // }
    const ocrData = OCR_DUMMY

    setOcrPage('page1', ocrData['page1'])
    setOcrPage('page2', ocrData['page2'])
    setOcrPage('page3', ocrData['page3'])
  }

  return { fetchOcrData }
}
