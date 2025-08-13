import { useRef } from 'react'

import { useStep } from '@/stores/useStep'

import { ContractAnalysisHighlight } from '../containers/ContractAnalysisHighlight'
import { ContractAnalysisSummary } from '../containers/ContractAnalysisSummary'
import { ContractAnalysisTranslate } from '../containers/ContractAnalysisTranslate'
import { useScrollSnap } from '../hooks/useScrollSnap'

import styles from './ContractAnalysisResult.module.css'

export const ContractAnalysisResult = () => {
  const carouselRef = useRef(null)
  const { currentStep, setStep } = useStep()

  useScrollSnap(carouselRef, setStep, `.${styles['snap-item']}`)

  return (
    <>
      <div className={styles['background']} />

      <section ref={carouselRef} className={styles['carousel-container']}>
        <div className={styles['snap-item']} data-index={1} aria-label='번역 섹션'>
          <ContractAnalysisTranslate />
        </div>
        <div className={styles['snap-item']} data-index={2} aria-label='하이라이트 섹션'>
          <ContractAnalysisHighlight />
        </div>
        <div className={styles['snap-item']} data-index={3} aria-label='요약 섹션'>
          <ContractAnalysisSummary />
        </div>
      </section>
    </>
  )
}
