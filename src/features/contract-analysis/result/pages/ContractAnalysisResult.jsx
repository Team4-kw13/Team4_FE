import { useRef } from 'react'

import { useStep } from '@/stores/useStep'

import { ContractAnalysisHighlight } from '../containers/ContractAnalysisHighlight'
import { ContractAnalysisSummary } from '../containers/ContractAnalysisSummary'
import { ContractAnalysisTranslate } from '../containers/ContractAnalysisTranslate'
import { useScrollSnap } from '../hooks/useScrollSnap'

import styles from './ContractAnalysisResult.module.css'

const PAGES = [
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

      <section ref={carouselRef} className={styles['carousel-container']}>
        {PAGES.map(({ label, components }, index) => (
          <div
            key={label}
            ref={slideRefs[index]}
            className={styles['snap-item']}
            data-index={index + 1}
            aria-label={label}
          >
            {components}
          </div>
        ))}
      </section>
    </>
  )
}
