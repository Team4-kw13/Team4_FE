import { useEffect, useRef } from 'react'
import cx from 'classnames'
import { useParams } from 'react-router-dom'

import { BackButton } from '@/components/back-button/BackButton'
import { Icon } from '@/components/Icon/Icon'
import { ScrollToTopButton } from '@/components/scroll-to-top-button/ScrollToTopButton'
import { ContractAnalysisLoading } from '@/features/contract-analysis-result/components/ContractAnalysisLoading'
import { useScrollSnap } from '@/hooks/useScrollSnap'
import { ROUTES } from '@/router/routes.constant'
import { useStep } from '@/stores/useStep'

import { AnalysisHistoryHighlight } from '../containers/AnalysisHistoryHighlight'
import { AnalysisHistorySummary } from '../containers/AnalysisHistorySummary'
import { AnalysisHistoryTranslate } from '../containers/AnalysisHistoryTranslate'
import { useFetchHistoryData } from '../services/useFetchHistoryData'

import styles from './AnalysisHistory.module.css'

export const AnalysisHistory = () => {
  const { contractId } = useParams()
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]

  const { currentStep, setStep, reset } = useStep()
  const { data, isLoading, isError } = useFetchHistoryData(contractId)

  useScrollSnap(carouselRef, slideRefs, setStep)

  useEffect(() => {
    reset()
  }, [])

  if (isLoading) return <ContractAnalysisLoading />
  if (isError) return <div>error</div>
  if (!data) return null

  return (
    <div className={styles['container']}>
      <div className={styles['background']} />
      <nav className={styles['back-button']}>
        <BackButton to={ROUTES.LIST_CONTRACT} />
      </nav>

      <div ref={carouselRef} className={styles['carousel-container']}>
        <section
          ref={slideRefs[0]}
          className={cx(styles['carousel-item'], styles['snap-item'])}
          data-index={1}
          aria-label={'번역 섹션'}
        >
          <AnalysisHistoryTranslate />
        </section>

        <section
          ref={slideRefs[1]}
          className={cx(styles['carousel-item'], styles['snap-item'])}
          data-index={2}
          aria-label={'하이라이트 섹션'}
        >
          <AnalysisHistoryHighlight />
        </section>

        <section
          ref={slideRefs[2]}
          className={styles['carousel-item']}
          data-index={3}
          aria-label={'요약 섹션'}
        >
          <AnalysisHistorySummary containerRef={carouselRef} />

          <div className={styles['scroll-button']}>
            <ScrollToTopButton targetRef={carouselRef} />
          </div>
        </section>
      </div>

      {currentStep !== 3 && (
        <div className={styles['scroll-down-button']}>
          <Icon name='scroll-down' width={44} height={16} />
        </div>
      )}
    </div>
  )
}
