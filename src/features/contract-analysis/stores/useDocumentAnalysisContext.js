import { useContext } from 'react'

import { DocumentAnalysisContext } from './DocumentAnalysisProvider'

/**
 * DocumentAnalysisContext를 편리하게 사용하기 위한 커스텀 훅
 *
 * - OCR 결과, 번역 결과, 요약 결과 및 관련 업데이트 함수에 접근 가능
 * - 반드시 DocumentAnalysisProvider 내부에서만 호출해야 함
 *
 * @returns {import('./DocumentAnalysisProvider').DocumentAnalysisContextValue}
 * @throws {Error} Provider 외부에서 호출 시 예외 발생
 */

export const useDocumentAnalysisContext = () => {
  const context = useContext(DocumentAnalysisContext)
  if (!context) {
    throw new Error('useDocumentAnalysisContext는 DocumentAnalysisProvider 내부에서만 사용하세요.')
  }

  return context
}
