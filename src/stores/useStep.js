import { useCallback, useMemo, useState } from 'react'

/**
 * @typedef {Object} StepController
 * @property {number} currentStep 현재 스텝 번호
 * @property {boolean} canGoToNextStep 다음 스텝으로 이동 가능 여부
 * @property {boolean} canGoToPrevStep 이전 스텝으로 이동 가능 여부
 * @property {(step: number | ((prev: number) => number)) => void} setStep 특정 스텝으로 이동
 * @property {() => void} goToNextStep 다음 스텝으로 이동
 * @property {() => void} goToPrevStep 이전 스텝으로 이동
 * @property {() => void} reset 스텝을 1로 초기화
 */

/**
 * 스텝 관리 훅
 * @param {number} maxStep 최대 스텝 수 (1 이상)
 * @returns {StepController}
 */

export const useStep = (maxStep) => {
  if (maxStep < 1) {
    throw new Error('maxStep은 1 이상이어야 합니다.')
  }

  const [currentStep, setCurrentStep] = useState(1)

  const canGoToNextStep = useMemo(() => currentStep < maxStep, [currentStep, maxStep])
  const canGoToPrevStep = useMemo(() => currentStep > 1, [currentStep])

  const setStep = useCallback(
    (step) => {
      setCurrentStep((prev) => {
        const next = typeof step === 'function' ? step(prev) : step
        if (next < 1) {
          return 1
        }
        if (next > maxStep) {
          return maxStep
        }
        return next
      })
    },
    [maxStep],
  )

  const goToNextStep = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [setStep])

  const goToPrevStep = useCallback(() => {
    setStep((prev) => prev - 1)
  }, [setStep])

  const reset = useCallback(() => {
    setCurrentStep(1)
  }, [])

  return {
    currentStep,
    canGoToNextStep,
    canGoToPrevStep,
    goToNextStep,
    goToPrevStep,
    setStep,
    reset,
  }
}
