import { create } from 'zustand'

import { stripHighlightMarkers } from '@/utils/highlightMarkers'

const initialState = {
  ocrByPage: {},
  translationByPage: {},
  highlightedTextByPage: {},
  summary: null,
  isNeedFetch: { page2: true, page3: true },
}

/**
 * 전역 문서 분석 상태
 *
 * - ocrByPage: 페이지별 OCR 블록
 * - translationByPage: 페이지별 번역 텍스트 배열(인덱스 기반 수정)
 * - highlightedTextByPage: 하이라이트 마커 포함 텍스트 배열(인덱스 기반 수정)
 * - summary: 요약 데이터
 * - isNeedFetch: 후속 요청 필요 여부 플래그
 */

export const useDocumentAnalysisStore = create((set) => ({
  ...initialState,

  actions: {
    /** 특정 페이지의 OCR 결과 저장 */
    setOcrPage: (pageKey, blocks) =>
      set((state) => ({ ocrByPage: { ...state.ocrByPage, [pageKey]: blocks ?? [] } })),

    setTranslationPage: (pageKey, texts) =>
      set((state) => ({
        translationByPage: {
          ...state.translationByPage,
          [pageKey]: texts ?? [],
        },
      })),

    /** 특정 페이지의 번역문 텍스트 수정 (인덱스 기반) */
    updateTranslationText: (pageKey, targetIndex, newText) =>
      set((state) => {
        const page = state.translationByPage[pageKey] ?? []
        if (targetIndex < 0 || targetIndex >= page.length) return {}
        const next = page.map((text, i) => (i === targetIndex ? newText : text))
        return { translationByPage: { ...state.translationByPage, [pageKey]: next } }
      }),

    /** 하이라이트 포함 텍스트 수정 + 번역문 동기화 */
    setHighlightedTextByPage: (pages) => set(() => ({ highlightedTextByPage: { ...pages } })),

    setHighlightedTextPage: (pageKey, texts) =>
      set((state) => ({
        highlightedTextByPage: {
          ...state.highlightedTextByPage,
          [pageKey]: texts ?? [],
        },
      })),

    updateHighlightedTextAndSync: (pageKey, targetIndex, newMarkedText) =>
      set((state) => {
        const highlighted = state.highlightedTextByPage[pageKey] ?? []
        const translated = state.translationByPage[pageKey] ?? []
        if (
          targetIndex < 0 ||
          targetIndex >= highlighted.length ||
          targetIndex >= translated.length
        ) {
          return {}
        }

        const nextHighlighted = highlighted.map((text, i) =>
          i === targetIndex ? newMarkedText : text,
        )
        const nextTranslated = translated.map((text, i) =>
          i === targetIndex ? stripHighlightMarkers(newMarkedText) : text,
        )

        return {
          highlightedTextByPage: { ...state.highlightedTextByPage, [pageKey]: nextHighlighted },
          translationByPage: { ...state.translationByPage, [pageKey]: nextTranslated },
        }
      }),

    /** 요약 데이터 저장 */
    saveSummary: (data) => set(() => ({ summary: data })),

    handleEditTranslate: () => set(() => ({ isNeedFetch: { page2: true, page3: true } })),

    handleEditHighlight: () =>
      set((state) => ({ isNeedFetch: { ...state.isNeedFetch, page3: true, page2: false } })),

    handleAfterFetch: (page) =>
      set((state) => ({ isNeedFetch: { ...state.isNeedFetch, [page]: false } })),

    reset: () => set({ ...initialState }),
  },
}))

export const useOcrByPage = () => useDocumentAnalysisStore((state) => state.ocrByPage)
export const useTranslationByPage = () =>
  useDocumentAnalysisStore((state) => state.translationByPage)
export const useHighlightedTextByPage = () =>
  useDocumentAnalysisStore((state) => state.highlightedTextByPage)
export const useSummary = () => useDocumentAnalysisStore((state) => state.summary)
export const useIsNeedFetch = () => useDocumentAnalysisStore((state) => state.isNeedFetch)
export const useDocumentAnalysisActions = () => useDocumentAnalysisStore((state) => state.actions)
