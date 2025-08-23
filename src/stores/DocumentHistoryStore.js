import { create } from 'zustand'

const initialState = {
  images: [],
  ocr: {},
  translation: {},
  highlight: {},
  summary: null,
}

export const useDocumentHistoryStore = create((set) => ({
  ...initialState,

  actions: {
    /**
     * 서버 스냅샷을 한 번에 저장
     */
    setFromServerSnapshot: (payload) => set({ ...payload }),
    reset: () => set({ ...initialState }),
  },
}))

export const useDocumentHistoryImages = () => useDocumentHistoryStore((state) => state.image)
export const useDocumentHistoryOcr = () => useDocumentHistoryStore((state) => state.ocr)
export const useDocumentHistoryTranslation = () =>
  useDocumentHistoryStore((state) => state.translation)
export const useDocumentHistoryHighlight = () => useDocumentHistoryStore((state) => state.highlight)
export const useDocumentHistorySummary = () => useDocumentHistoryStore((state) => state.summary)
export const useDocumentHistoryActions = () => useDocumentHistoryStore((state) => state.actions)
