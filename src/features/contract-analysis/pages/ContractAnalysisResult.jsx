import { useRef } from 'react'

import { useStep } from '@/stores/useStep'

import { ContractAnalysisHighlight } from '../containers/ContractAnalysisHighlight'
import { ContractAnalysisSummary } from '../containers/ContractAnalysisSummary'
import { ContractAnalysisTranslate } from '../containers/ContractAnalysisTranslate'
import { useScrollSnap } from '../hooks/useScrollSnap'

import styles from './ContractAnalysisResult.module.css'

const RESULT_SECTIONS = [
  { label: '번역 섹션', components: <ContractAnalysisTranslate /> },
  { label: '하이라이트 섹션', components: <ContractAnalysisHighlight /> },
  { label: '요약 섹션', components: <ContractAnalysisSummary /> },
]

export const ContractAnalysisResult = () => {
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]

  const { setStep } = useStep()

  useScrollSnap(carouselRef, slideRefs, setStep)

  return (
    <>
      <div className={styles['background']} />
      <div ref={carouselRef} className={styles['carousel-container']}>
        {RESULT_SECTIONS.map(({ label, components }, index) => (
          <section
            key={label}
            ref={slideRefs[index]}
            className={styles['snap-item']}
            data-index={index + 1}
            aria-label={label}
          >
            {components}
          </section>
        ))}
      </div>
    </>
  )
}
