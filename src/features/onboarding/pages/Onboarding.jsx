// src/features/onboarding/containers/Onboarding.jsx
import { useEffect, useMemo, useRef } from 'react'
import cx from 'classnames'

import { PrimaryButton } from '@/components/primary-button/PrimaryButton'
import { useScrollSnap } from '@/hooks/useScrollSnap'
import { useStep } from '@/stores/useStep'

import { OnboardingFirst } from '../components/OnboardingFirst'
import { OnboardingSecond } from '../components/OnboardingSecond'
import { OnboardingThird } from '../components/OnboardingThird'

import styles from './Onboarding.module.css'

/**
 * 온보딩 컨테이너
 *
 * - 스크롤 → 스텝 동기화: useScrollSnap
 * - 버튼 클릭(프로그램 기원)일 때만 스텝 → 스크롤 동기화
 *
 * @returns {import('react').JSX.Element}
 */
export function Onboarding() {
  const carouselRef = useRef(null)
  const { currentStep, setStep, goToNextStep } = useStep(3)

  const slideRef1 = useRef(null)
  const slideRef2 = useRef(null)
  const slideRef3 = useRef(null)
  const slideRefs = useMemo(() => [slideRef1, slideRef2, slideRef3], [])

  const shouldAutoScrollRef = useRef(false)

  useScrollSnap(carouselRef, slideRefs, setStep, {
    isProgrammaticRef: shouldAutoScrollRef,
  })

  useEffect(() => {
    if (!shouldAutoScrollRef.current) return

    const container = carouselRef.current
    const target = slideRefs?.[currentStep - 1]?.current
    if (!container || !target) {
      shouldAutoScrollRef.current = false
      return
    }

    const handleScrollEnd = () => {
      shouldAutoScrollRef.current = false
      container.removeEventListener('scrollend', handleScrollEnd)
    }
    container.addEventListener('scrollend', handleScrollEnd, { once: true })

    const tid = setTimeout(() => {
      shouldAutoScrollRef.current = false
      container.removeEventListener('scrollend', handleScrollEnd)
    }, 600)

    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })

    return () => clearTimeout(tid)
  }, [currentStep, slideRefs])

  const handleNextClick = () => {
    shouldAutoScrollRef.current = true
    goToNextStep()
  }

  return (
    <div className={styles.container}>
      <div ref={carouselRef} className={styles['scroll-container']}>
        <section data-index={1} ref={slideRefs[0]} className={styles['scroll-item']}>
          <OnboardingFirst />
        </section>
        <section data-index={2} ref={slideRefs[1]} className={styles['scroll-item']}>
          <OnboardingSecond />
        </section>
        <section data-index={3} ref={slideRefs[2]} className={styles['scroll-item']}>
          <OnboardingThird />
        </section>
      </div>

      <div className={styles['dot-container']}>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={cx(styles.dot, {
              [styles['dot--active']]: currentStep === index + 1,
            })}
          />
        ))}
      </div>

      <PrimaryButton
        size='lg'
        label='한집말이 시작하기'
        className={styles['start-button']}
        onClick={handleNextClick}
      />
    </div>
  )
}
