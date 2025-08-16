import { useRef } from 'react'

import { ContractAnalysisImageSlideHighlight } from '@/components/contract-image-slide/ContractImageSlideHighlight'
import { StepProgress } from '@/components/StepProgress/StepProgress'
import { UnderlineText } from '@/components/UnderlineText/UnderlineText'
import { ContractAnalysisDownloadButton } from '@/features/contract-analysis/components/ContractAnalysisDownloadButton'
import { ContractAnalysisTooltip } from '@/features/contract-analysis/components/ContractAnalysisTooltip'
import { useScrollSnap } from '@/features/contract-analysis/hooks/useScrollSnap'
import { useHtml2CanvasBatch } from '@/hooks/useHtml2CanvasBatch'
import { useStep } from '@/stores/useStep'

import styles from './AnalysisHistoryHighlight.module.css'

export const AnalysisHistoryHighlight = () => {
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]

  const { currentStep, setStep } = useStep()
  const { downloadAll } = useHtml2CanvasBatch({ refs: slideRefs })

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
        <ContractAnalysisImageSlideHighlight images={[]} slideRefs={slideRefs} />
        <ContractAnalysisDownloadButton onDownload={downloadAll} />
        <ContractAnalysisTooltip />
        <div className={styles['progress']}>
          <StepProgress currentStep={currentStep} />
        </div>
      </section>
    </div>
  )
}
