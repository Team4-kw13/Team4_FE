import { useRef } from 'react'

import { ContractAnalysisDownloadButton } from '@/components/analysis-download-button/ContractAnalysisDownloadButton'
import { ContractAnalysisTooltip } from '@/components/analysis-tooltip/ContractAnalysisTooltip'
import { StepProgress } from '@/components/step-progress/StepProgress'
import { UnderlineText } from '@/components/underline-text/UnderlineText'
import { useScrollSnap } from '@/hooks/useScrollSnap'
import { useStep } from '@/stores/useStep'
import { useUploadedImagesContext } from '@/stores/useUploadedImagesContext'

import { ContractAnalysisImageSlideTranslation } from '../../../components/contract-image-slide/ContractImageSlideTranslation'
import { ContractAnalysisLoading } from '../components/ContractAnalysisLoading'
import { useFetchOcrTranslationData } from '../hooks/useFetchOcrTranslationData'

import styles from './ContractAnalysisTranslate.module.css'

/**
 * 계약서 번역 결과 화면 컴포넌트
 *
 * @returns {JSX.Element}
 */

export const ContractAnalysisTranslate = () => {
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]
  const { items } = useUploadedImagesContext()
  const { isLoading } = useFetchOcrTranslationData()
  const { currentStep, setStep } = useStep()

  useScrollSnap(carouselRef, slideRefs, setStep)

  if (isLoading) return <ContractAnalysisLoading />

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
        <ContractAnalysisImageSlideTranslation images={items} slideRefs={slideRefs} />
        <ContractAnalysisDownloadButton refs={slideRefs} />
        <ContractAnalysisTooltip />
        <div className={styles['progress']}>
          <StepProgress currentStep={currentStep} />
        </div>
      </section>
    </div>
  )
}
