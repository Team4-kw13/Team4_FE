import { useRef } from 'react'

import { StepProgress } from '@/components/StepProgress/StepProgress'
import { useHtml2CanvasBatch } from '@/hooks/useHtml2CanvasBatch'
import { useStep } from '@/stores/useStep'

import { ContractAnalysisDownloadButton } from '../components/ContractAnalysisDownloadButton'
import { ContractAnalysisImageSlide } from '../components/ContractAnalysisImageSlide'
import { ContractAnalysisTooltip } from '../components/ContractAnalysisTooltip'
import { useScrollSnap } from '../hooks/useScrollSnap'

import styles from './ContractAnalysisHighlight.module.css'

export const ContractAnalysisHighlight = () => {
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]

  const { currentStep, setStep } = useStep()
  const { downloadAll } = useHtml2CanvasBatch({ refs: slideRefs })

  useScrollSnap(carouselRef, slideRefs, setStep)

  return (
    <div>
      <header className={styles['header']}>
        <h2>
          <span className={styles['underline']}>키워드</span>를 표시했어요!
        </h2>
        <h2>중요한 부분부터 확인해볼까요?</h2>
      </header>

      <section ref={carouselRef} className={styles['analysis-section']}>
        <ContractAnalysisImageSlide slideRefs={slideRefs} />
        <ContractAnalysisDownloadButton onDownload={downloadAll} />
        <ContractAnalysisTooltip />
        <div className={styles['progress']}>
          <StepProgress currentStep={currentStep} />
        </div>
      </section>
    </div>
  )
}
