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
    if (!root) return
    const slides = (Array.isArray(slideRefs) ? slideRefs : [])
      .map((r) => r?.current)
      .filter(Boolean)
    if (!slides.length) return

    root.scrollTo({ left: 0, behavior: 'auto' })

    let current = 1
    const observer = new IntersectionObserver(
      (entries) => {
        let best = null
        for (const e of entries) {
          if (!e.isIntersecting) continue
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        }
        if (best) {
          const idx = Number(best.target.dataset.index)
          if (idx && idx !== current) {
            current = idx
            setStep(idx)
          }
        }
      },
      {
        root,
        threshold: [0.35, 0.75, 0.98],
      },
    )

    slides.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [carouselRef, slideRefs, setStep])
}
