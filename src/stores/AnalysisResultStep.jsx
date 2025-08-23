import { create } from 'zustand'

/**
 * @typedef {Object} StepState
 * @property {number} currentStep 현재 스텝 번호(1 이상)
 * @property {number} maxStep 최대 스텝 수(1 이상)
 */

/**
 * @typedef {Object} StepActions
 * @property {(step: number | ((previous: number) => number)) => void} setStep 특정 스텝으로 이동(1~maxStep 범위 자동 보정)
 * @property {() => void} goToNextStep 다음 스텝으로 이동(최대값 초과 방지)
 * @property {() => void} goToPrevStep 이전 스텝으로 이동(1 미만 방지)
 * @property {() => void} reset 스텝을 1로 초기화
 */

/**
 * @typedef {StepState & { actions: StepActions }} StepStore
 */

/** @param {number} value @param {number} maxStep */
const clampStep = (value, maxStep) => {
  if (value < 1) return 1
  if (value > maxStep) return maxStep
  return value
}

const initialState = /** @type {StepState} */ ({
  currentStep: 1,
  maxStep: 3,
})

/** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<StepStore>>} */
export const useStepStore = create((set) => ({
  ...initialState,
  actions: {
    setStep: (step) =>
      set((state) => {
        const next = typeof step === 'function' ? step(state.currentStep) : step
        return { currentStep: clampStep(next, state.maxStep) }
      }),

    goToNextStep: () =>
      set((state) => ({
        currentStep: clampStep(state.currentStep + 1, state.maxStep),
      })),

    goToPrevStep: () =>
      set((state) => ({
        currentStep: clampStep(state.currentStep - 1, state.maxStep),
      })),

    reset: () => set({ currentStep: 1 }),
  },
}))

export const useAnalysisResultCurrentStep = () => useStepStore((state) => state.currentStep)
export const useAnalysisResultMaxStep = () => useStepStore((state) => state.maxStep)
export const useAnalysisResultStepActions = () => useStepStore((state) => state.actions)
