import { useEffect, useRef } from 'react'
import cx from 'classnames'

import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton'
import { ScrollToTopButton } from '@/components/ScrollToTopButton/ScrollToTopButton'
import { useScrollSnap } from '@/hooks/useScrollSnap'
import { useDocumentAnalysisContext } from '@/stores/useDocumentAnalysisContext'
import { useStep } from '@/stores/useStep'

import { ContractAnalysisLoading } from '../components/ContractAnalysisLoading'
import { ContractAnalysisHighlight } from '../containers/ContractAnalysisHighlight'
import { ContractAnalysisSummary } from '../containers/ContractAnalysisSummary'
import { ContractAnalysisTranslate } from '../containers/ContractAnalysisTranslate'
import { useHighlight } from '../hooks/useHighlight'
import { useSummary } from '../hooks/useSummary'

import styles from './ContractAnalysisResult.module.css'

export const ContractAnalysisResult = () => {
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]
  const { isLoading: isHighlightLoading, fetchHighlightData } = useHighlight()
  const { isLoading: isSummaryLoading, fetchSummaryData } = useSummary()
  const {
    state: { translationByPage, highlightedTextByPage, summary, isNeedFetch },
  } = useDocumentAnalysisContext()

  const { currentStep, setStep } = useStep()

  useScrollSnap(carouselRef, slideRefs, setStep)

  useEffect(() => {
    if (currentStep === 2 && isNeedFetch['page2']) {
      fetchHighlightData(translationByPage)
    }
    if (currentStep === 3 && isNeedFetch['page3']) {
      fetchSummaryData(translationByPage)
    }
  }, [currentStep, isNeedFetch, translationByPage, fetchHighlightData, fetchSummaryData])

  if (isHighlightLoading || isSummaryLoading) return <ContractAnalysisLoading />

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
          {translationByPage && <ContractAnalysisTranslate />}
        </section>

        <section
          ref={slideRefs[1]}
          className={cx(styles['carousel-item'], styles['snap-item'])}
          data-index={2}
          aria-label={'하이라이트 섹션'}
        >
          {highlightedTextByPage &&
            (isHighlightLoading ? <ContractAnalysisLoading /> : <ContractAnalysisHighlight />)}
        </section>

        <section
          ref={slideRefs[2]}
          className={styles['carousel-item']}
          data-index={3}
          aria-label={'요약 섹션'}
        >
          {summary &&
            (isSummaryLoading ? (
              <ContractAnalysisLoading />
            ) : (
              <ContractAnalysisSummary containerRef={carouselRef} />
            ))}

          <div className={styles['scroll-button']}>
            <ScrollToTopButton targetRef={carouselRef} />
          </div>

          <PrimaryButton
            size='lg'
            label='저장하기'
            className={styles['save-button']}
            onClick={() => {}}
          />
        </section>
      </div>
    </>
  )
}
