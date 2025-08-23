import instance from '@/api/client'
import {
  useHighlightedTextByPage,
  useSummary,
  useTranslationByPage,
} from '@/stores/DocumentAnalysisStore'

/**
 * 분석 데이터 저장 훅
 */
export const useSaveAnalysisData = () => {
  const contractName = '주택임대차표준계약서'
  const translate = useTranslationByPage()
  const highlight = useHighlightedTextByPage()
  const summary = useSummary()

  const saveAnalysisData = async () => {
    const payload = {
      contractName,
      translate,
      highlight,
      commonSummary: summary.summary,
      warningSummary: summary.warning,
    }

    const response = await instance.post('/api/contracts', payload)
    return response.data
  }

  return { saveAnalysisData }
}
