import { useEffect, useMemo, useRef } from 'react'
import cx from 'classnames'

import { Icon } from '@/components/Icon/Icon'
import { useScrollSnap } from '@/hooks/useScrollSnap'
import {
  useAnalysisResultCurrentStep,
  useAnalysisResultStepActions,
} from '@/stores/AnalysisResultStep'
import { useHighlightedTextByPage, useTranslationByPage } from '@/stores/DocumentAnalysisStore'

import { ContractAnalysisHighlight } from '../containers/ContractAnalysisHighlight'
import { ContractAnalysisSummary } from '../containers/ContractAnalysisSummary'
import { ContractAnalysisTranslate } from '../containers/ContractAnalysisTranslate'

import styles from './ContractAnalysisResult.module.css'

export const ContractAnalysisResult = () => {
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]

  const currentStep = useAnalysisResultCurrentStep()
  const { setStep } = useAnalysisResultStepActions()

  const translate = useTranslationByPage()
  const highlight = useHighlightedTextByPage()

  const isAllTranslated = useMemo(
    () =>
      ['page1', 'page2', 'page3'].every(
        (k) => Array.isArray(translate?.[k]) && translate[k].length > 0,
      ),
    [translate],
  )

  const isAllHighlighted = useMemo(
    () =>
      ['page1', 'page2', 'page3'].every(
        (k) => Array.isArray(highlight?.[k]) && highlight[k].length > 0,
      ),
    [highlight],
  )

  useEffect(() => {
    setStep(0)
  }, [setStep])

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

        {isAllTranslated && (
          <section
            ref={slideRefs[1]}
            className={cx(styles['carousel-item'], styles['snap-item'])}
            data-index={2}
            aria-label={'하이라이트 섹션'}
          >
            <ContractAnalysisHighlight />
          </section>
        )}

        {isAllTranslated && isAllHighlighted && (
          <section
            ref={slideRefs[2]}
            className={cx(styles['carousel-item'], styles['snap-last-item'])}
            data-index={3}
            aria-label={'요약 섹션'}
          >
            <ContractAnalysisSummary containerRef={carouselRef} />
          </section>
        )}
      </div>
      {isAllTranslated && isAllHighlighted && currentStep !== 3 && (
        <div className={styles['scroll-down-button']}>
          <Icon name='scroll-down' width={44} height={16} />
        </div>
      )}
    </>
  )
}
