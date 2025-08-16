import { useRef } from 'react'
import cx from 'classnames'

import { BackButton } from '@/components/BackButton/BackButton'
import { ScrollToTopButton } from '@/components/ScrollToTopButton/ScrollToTopButton'
import { useScrollSnap } from '@/features/contract-analysis/hooks/useScrollSnap'
import { DocumentAnalysisProvider } from '@/stores/DocumentAnalysisProvider'
import { useStep } from '@/stores/useStep'

import { AnalysisHistoryHighlight } from '../containers/AnalysisHistoryHighlight'
import { AnalysisHistorySummary } from '../containers/AnalysisHistorySummary'
import { AnalysisHistoryTranslate } from '../containers/AnalysisHistoryTranslate'

import styles from './AnalysisHistory.module.css'

export const AnalysisHistory = () => {
  const carouselRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]

  const { setStep } = useStep()

  useScrollSnap(carouselRef, slideRefs, setStep)

  return (
    <DocumentAnalysisProvider>
      <div className={styles['container']}>
        <div className={styles['background']} />
        <nav className={styles['back-button']}>
          <BackButton />
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
      </div>
    </DocumentAnalysisProvider>
  )
}
