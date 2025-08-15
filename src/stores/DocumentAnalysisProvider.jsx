import { createContext, useCallback, useMemo, useState } from 'react'

import { stripHighlightMarkers } from '@/utils/highlightMarkers'

/**
 * @typedef {Object} OcrBlock
 * @property {string} id OCR 블록 고유 ID
 * @property {string} text OCR로 인식된 원본 텍스트
 * @property {{x:number,y:number,width:number,height:number}} [bbox] 원본 이미지에서의 위치와 크기 (px 단위)
 */

/**
 * @typedef {Object} TranslationBlock
 * @property {string} id OCR 블록 고유 ID
 * @property {string} original 원본 텍스트
 * @property {string} translated 번역된 텍스트
 */

/**
 * @typedef {Object} HighlightedTextBlock
 * @property {string} id OCR 블록 고유 ID
 * @property {string} text 하이라이트 마커가 포함된 텍스트 ([[w]]...[[/]] or [[i]]...[[/]])
 */

/**
 * @typedef {Object} SummaryData
 * @property {string[]} sections 섹션별 요약 텍스트 목록
 * @property {string} plain 전체 요약 텍스트
 */

/**
 * @typedef {Object} DocumentAnalysisState
 * @property {Record<string, OcrBlock[]>} ocrByPage 페이지별 OCR 블록 목록
 * @property {Record<string, TranslationBlock[]>} translationByPage 페이지별 번역 블록 목록
 * @property {Record<string, HighlightedTextBlock[]>} highlightedTextByPage 페이지별 하이라이트 포함 번역 블록 목록
 * @property {SummaryData|null} summary 요약 데이터
 */

// eslint-disable-next-line react-refresh/only-export-components
export const DocumentAnalysisContext = createContext(null)

/**
 * 문서 분석 데이터(ocr, 번역, 하이라이트, 요약)를 전역 상태로 관리하는 Provider
 *
 * @param {import('react').PropsWithChildren} props
 * @returns {JSX.Element}
 */
export const DocumentAnalysisProvider = ({ children }) => {
  const [ocrByPage, setOcrByPage] = useState({})
  const [translationByPage, setTranslationByPage] = useState({})
  const [highlightedTextByPage, setHighlightedTextByPage] = useState({})
  const [summary, setSummary] = useState(null)

  /** 특정 페이지의 OCR 결과 저장 */
  const setOcrPage = useCallback((pageKey, blocks) => {
    setOcrByPage((prev) => ({ ...prev, [pageKey]: blocks ?? [] }))
  }, [])

  /** 특정 페이지의 번역문 텍스트 수정 (인덱스 기반) */
  const updateTranslationText = useCallback((pageKey, targetIndex, newText) => {
    setTranslationByPage((prev) => {
      const translationBlocks = prev[pageKey] ?? []
      if (targetIndex < 0 || targetIndex >= translationBlocks.length) {
        return prev
      }

      const next = translationBlocks.map((block, blockIndex) =>
        blockIndex === targetIndex ? newText : block,
      )
      return { ...prev, [pageKey]: next }
    })
  }, [])

  /** 하이라이트 포함 텍스트 수정 + 번역문 동기화 */
  const updateHighlightedTextAndSync = useCallback((pageKey, targetIndex, newMarkedText) => {
    setHighlightedTextByPage((prev) => {
      const highlightedBlocks = prev[pageKey] ?? []
      if (targetIndex < 0 || targetIndex >= highlightedBlocks.length) {
        return prev
      }

      const next = highlightedBlocks.map((block, blockIndex) =>
        blockIndex === targetIndex ? newMarkedText : block,
      )
      return { ...prev, [pageKey]: next }
    })

    setTranslationByPage((prev) => {
      const translationBlocks = prev[pageKey] ?? []
      if (targetIndex < 0 || targetIndex >= translationBlocks.length) {
        return prev
      }

      const next = translationBlocks.map((block, blockIndex) =>
        blockIndex === targetIndex ? stripHighlightMarkers(newMarkedText) : block,
      )
      return { ...prev, [pageKey]: next }
    })
  }, [])

  /** 요약 데이터 저장 */
  const saveSummary = useCallback((data) => {
    setSummary(data)
  }, [])

  /** 모든 분석 데이터 초기화 */
  const reset = useCallback(() => {
    setOcrByPage({})
    setTranslationByPage({})
    setHighlightedTextByPage({})
    setSummary(null)
  }, [])

  const value = useMemo(
    () => ({
      state: { ocrByPage, translationByPage, highlightedTextByPage, summary },
      actions: {
        setOcrPage,
        setTranslationByPage,
        updateTranslationText,
        setHighlightedTextByPage,
        updateHighlightedTextAndSync,
        saveSummary,
        reset,
      },
    }),
    [
      ocrByPage,
      translationByPage,
      highlightedTextByPage,
      summary,
      setOcrPage,
      setTranslationByPage,
      updateTranslationText,
      setHighlightedTextByPage,
      updateHighlightedTextAndSync,
      saveSummary,
      reset,
    ],
  )

  return (
    <DocumentAnalysisContext.Provider value={value}>{children}</DocumentAnalysisContext.Provider>
  )
}
