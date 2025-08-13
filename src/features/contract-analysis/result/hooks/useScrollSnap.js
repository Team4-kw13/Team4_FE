import { useEffect } from 'react'

/**
 * 슬라이드 스크롤 스냅 관찰 훅
 *
 * @param {import('react').RefObject<HTMLElement>} carouselRef
 *   슬라이드들을 감싸는 캐러셀 컨테이너의 ref
 * @param {import('react').RefObject<HTMLElement>[]} slideRefs
 *   개별 슬라이드 컨테이너들의 ref 배열
 * @param {(step: number) => void} setStep
 *   현재 스텝 상태를 갱신하는 함수
 */

export const useScrollSnap = (carouselRef, slideRefs, setStep) => {
  useEffect(() => {
    const root = carouselRef.current
    if (!root || !Array.isArray(slideRefs) || slideRefs.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = entry.target.dataset.index
            if (stepIndex) setStep(Number(stepIndex))
          }
        })
      },
      { root, rootMargin: '0px', threshold: 0.5 },
    )

    slideRefs.forEach((ref) => {
      const el = ref?.current
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [carouselRef, setStep, slideRefs])
}
