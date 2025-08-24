import { useRef } from 'react'

import { ContractAnalysisDownloadButton } from '@/components/analysis-download-button/ContractAnalysisDownloadButton'
import { ContractAnalysisTooltip } from '@/components/analysis-tooltip/ContractAnalysisTooltip'
import { ContractAnalysisImageSlideHighlight } from '@/components/contract-image-slide/ContractImageSlideHighlight'
import { StepProgress } from '@/components/step-progress/StepProgress'
import { UnderlineText } from '@/components/underline-text/UnderlineText'
import { useScrollSnap } from '@/hooks/useScrollSnap'
import { useStep } from '@/stores/useStep'
import { useUploadedImagesContext } from '@/stores/useUploadedImagesContext'

import { ContractAnalysisLoading } from '../components/ContractAnalysisLoading'
import { useFetchHighlightData } from '../hooks/useFetchHighlightData'

import styles from './ContractAnalysisHighlight.module.css'

export const ContractAnalysisHighlight = () => {
  const carouselRef = useRef(null)
  const { items } = useUploadedImagesContext()
  const slideRefs = [useRef(null), useRef(null), useRef(null)]

  const { currentStep, setStep } = useStep()
  const { isLoading } = useFetchHighlightData()

  useScrollSnap(carouselRef, slideRefs, setStep)

  if (isLoading)
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

        <section className={styles['loading-container']}>
          <ContractAnalysisLoading custom={true} />
        </section>
      </div>
    )

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
        <ContractAnalysisImageSlideHighlight images={items} slideRefs={slideRefs} />
        <ContractAnalysisDownloadButton
          refs={slideRefs}
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
