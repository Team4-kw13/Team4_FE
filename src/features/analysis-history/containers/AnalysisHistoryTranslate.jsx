import { useEffect, useRef } from 'react'

import { ContractAnalysisDownloadButton } from '@/components/analysis-download-button/ContractAnalysisDownloadButton'
import { ContractAnalysisTooltip } from '@/components/analysis-tooltip/ContractAnalysisTooltip'
import { StepProgress } from '@/components/step-progress/StepProgress'
import { UnderlineText } from '@/components/underline-text/UnderlineText'
import { useScrollSnap } from '@/hooks/useScrollSnap'
import { useStep } from '@/stores/useStep'

import { TranslationHistoryImageSlide } from '../components/TranslationHistoryImageSlide'

import styles from './AnalysisHistoryTranslate.module.css'

export const AnalysisHistoryTranslate = () => {
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]

  const { currentStep, setStep, reset } = useStep()

  useEffect(() => {
    reset()
  }, [])

  useScrollSnap(carouselRef, slideRefs, setStep)

  return (
    <div>
      <header className={styles['header']}>
        <h2>
          <span className={styles['logo']}>한집말이</span> 가 <UnderlineText>번역</UnderlineText>을
          했어요!
        </h2>
        <h2>같이 꼼꼼하게 확인해볼까요?</h2>
      </header>

      <section ref={carouselRef} className={styles['analysis-section']}>
        <TranslationHistoryImageSlide slideRefs={slideRefs} />
        <ContractAnalysisDownloadButton refs={slideRefs} activeIndex={currentStep - 1} />
        <ContractAnalysisTooltip />
        <div className={styles['progress']}>
          <StepProgress currentStep={currentStep} />
        </div>
      </section>
    </div>
  )
}
