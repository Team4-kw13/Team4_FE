import { useRef } from 'react'
import cx from 'classnames'

import { ScrollToTopButton } from '@/components/ScrollToTopButton/ScrollToTopButton'
import { useStep } from '@/stores/useStep'

import { ContractAnalysisHighlight } from '../containers/ContractAnalysisHighlight'
import { ContractAnalysisSummary } from '../containers/ContractAnalysisSummary'
import { ContractAnalysisTranslate } from '../containers/ContractAnalysisTranslate'
import { useScrollSnap } from '../hooks/useScrollSnap'
import { useDocumentAnalysisContext } from '../stores/useDocumentAnalysisContext'

import styles from './ContractAnalysisResult.module.css'

export const ContractAnalysisResult = () => {
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]
  const { ocr, translation, summary } = useDocumentAnalysisContext()
  console.log(ocr, translation, summary)

  const { setStep } = useStep()

  useScrollSnap(carouselRef, slideRefs, setStep)

  return (
    <>
      <div className={styles['background']} />
      <div ref={carouselRef} className={styles['carousel-container']}>
        <section
          ref={slideRefs[0]}
          className={cx(styles['carousel-item'], styles['snap-item'])}
          data-index={1}
          aria-label={'번역 섹션'}
        >
          <ContractAnalysisTranslate />
        </section>

        <section
          ref={slideRefs[1]}
          className={cx(styles['carousel-item'], styles['snap-item'])}
          data-index={2}
          aria-label={'하이라이트 섹션'}
        >
          <ContractAnalysisHighlight />
        </section>

        <section
          ref={slideRefs[2]}
          className={styles['carousel-item']}
          data-index={3}
          aria-label={'요약 섹션'}
        >
          <ContractAnalysisSummary containerRef={carouselRef} />

          <div className={styles['scroll-button']}>
            <ScrollToTopButton targetRef={carouselRef} />
          </div>
        </section>
      </div>
    </>
  )
}
