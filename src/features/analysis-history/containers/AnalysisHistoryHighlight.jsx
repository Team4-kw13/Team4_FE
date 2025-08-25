import { useEffect, useRef } from 'react'

import { ContractAnalysisDownloadButton } from '@/components/analysis-download-button/ContractAnalysisDownloadButton'
import { ContractAnalysisTooltip } from '@/components/analysis-tooltip/ContractAnalysisTooltip'
import { StepProgress } from '@/components/step-progress/StepProgress'
import { UnderlineText } from '@/components/underline-text/UnderlineText'
import { useScrollSnap } from '@/hooks/useScrollSnap'
import { useDocumentHistoryHighlight } from '@/stores/DocumentHistoryStore'
import { useStep } from '@/stores/useStep'

import { HighlightHistoryImageSlide } from '../components/HighlightHistoryImageSlide'

import styles from './AnalysisHistoryHighlight.module.css'

export const AnalysisHistoryHighlight = () => {
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]

  const { currentStep, setStep, reset } = useStep()
  const highlight = useDocumentHistoryHighlight()

  useEffect(() => {
    reset()
  }, [highlight, reset])

  useScrollSnap(carouselRef, slideRefs, setStep)

  return (
    <div>
      <header className={styles['header']}>
        <h2>
          <UnderlineText>키워드</UnderlineText>를 표시했어요!
        </h2>
        <h2>중요한 부분부터 확인해볼까요?</h2>
      </header>

      <p className={styles['description']}>
        노란색은 중요한 내용, 파란색은 한 번 더 주의할 부분이에요.
      </p>

      <section ref={carouselRef} className={styles['analysis-section']}>
        <HighlightHistoryImageSlide slideRefs={slideRefs} />
        <ContractAnalysisDownloadButton
          refs={slideRefs}
          activeIndex={currentStep - 1}
          getFileName={(i) => `하이라이트 ${i + 1}.png`}
        />
        <ContractAnalysisTooltip />
        <div className={styles['progress']}>
          <StepProgress currentStep={currentStep} />
        </div>
      </section>
    </div>
  )
}
