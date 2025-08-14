import { createContext, useCallback, useMemo, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const DocumentAnalysisContext = createContext(null)

/**
 * 문서 분석 결과를 전역으로 관리하는 Context Provider
 *
 * - OCR(문자 인식) 결과, 번역 결과, 요약 결과를 상태로 보관
 *
 * @param {import('react').PropsWithChildren} props
 * @returns {JSX.Element}
 */

export const DocumentAnalysisProvider = ({ children }) => {
  const [ocr, setOCR] = useState({})
  const [translation, setTranslation] = useState({})
  const [summary, setSummary] = useState(null)

  const getOCRPage = useCallback((pageId) => ocr?.[pageId] ?? [], [ocr])
  const getTRPage = useCallback((pageId) => translation?.[pageId] ?? [], [translation])

  const updateOCR = useCallback((pageId, pageData) => {
    setOCR((prevOcr) => ({
      ...prevOcr,
      [pageId]: pageData,
    }))
  }, [])

  const updateTranslation = useCallback((pageId, pageData) => {
    setTranslation((prevTranslation) => ({
      ...prevTranslation,
      [pageId]: pageData,
    }))
  }, [])

  const value = useMemo(
    () => ({
      ocr,
      translation,
      summary,
      getOCRPage,
      getTRPage,
      updateOCR,
      updateTranslation,
      updateSummary: setSummary,
    }),
    [ocr, translation, summary, getOCRPage, getTRPage, updateOCR, updateTranslation],
  )

  return (
    <DocumentAnalysisContext.Provider value={value}>{children}</DocumentAnalysisContext.Provider>
  )
}
