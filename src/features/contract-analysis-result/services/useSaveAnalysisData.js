import instance from '@/api/client'
import { useHighlightedTextByPage, useOcrByPage, useSummary } from '@/stores/DocumentAnalysisStore'

/**
 * 분석 데이터 저장 훅
 */
export const useSaveAnalysisData = () => {
  const contractName = '주택임대차표준계약서'
  const ocr = useOcrByPage()
  const highlight = useHighlightedTextByPage()
  const summary = useSummary()

  const saveAnalysisData = async () => {
    const payload = {
      contractName,
      highlight: {
        page1: highlight['page1'].map((content, index) => ({
          content,
          vertices: ocr['page1'][index]?.vertices || null,
        })),
        page2: highlight['page2'].map((content, index) => ({
          content,
          vertices: ocr['page2'][index]?.vertices || null,
        })),
        page3: highlight['page3'].map((content, index) => ({
          content,
          vertices: ocr['page3'][index]?.vertices || null,
        })),
      },
      commonSummary: summary.summary,
      warningSummary: summary.warning,
    }
    // console.log(payload)

    const response = await instance.post('/api/contracts', payload)
    return response.data
  }

  return { saveAnalysisData }
}
