import { useRef } from 'react'

import { ContractAnalysisImageSlideTranslation } from '@/components/contract-image-slide/ContractImageSlideTranslation'
import { StepProgress } from '@/components/StepProgress/StepProgress'
import { UnderlineText } from '@/components/UnderlineText/UnderlineText'
import { ContractAnalysisDownloadButton } from '@/features/contract-analysis/components/ContractAnalysisDownloadButton'
import { ContractAnalysisTooltip } from '@/features/contract-analysis/components/ContractAnalysisTooltip'
import { useScrollSnap } from '@/features/contract-analysis/hooks/useScrollSnap'
import { useHtml2CanvasBatch } from '@/hooks/useHtml2CanvasBatch'
import { useStep } from '@/stores/useStep'

import styles from './AnalysisHistoryTranslate.module.css'

export const AnalysisHistoryTranslate = () => {
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]

  const { currentStep, setStep } = useStep()
  const { downloadAll } = useHtml2CanvasBatch({ refs: slideRefs })

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
        <ContractAnalysisImageSlideTranslation images={[]} slideRefs={slideRefs} readOnly />
        <ContractAnalysisDownloadButton onDownload={downloadAll} />
        <ContractAnalysisTooltip />
        <div className={styles['progress']}>
          <StepProgress currentStep={currentStep} />
        </div>
      </section>
    </div>
  )
}
