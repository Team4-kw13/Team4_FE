import { AnalysisSummarySection } from '@/components/analysis-summary-section/AnalysisSummarySection'
import { Icon } from '@/components/Icon/Icon'
import { UnderlineText } from '@/components/UnderlineText/UnderlineText'
import { useSummary } from '@/stores/DocumentAnalysisStore'

import { ContractAnalysisLoading } from '../components/ContractAnalysisLoading'
import { useFetchSummaryData } from '../hooks/useFetchSummaryData'

import styles from './ContractAnalysisSummary.module.css'

export const ContractAnalysisSummary = () => {
  const { isLoading } = useFetchSummaryData()
  const summary = useSummary()

  if (isLoading) return <ContractAnalysisLoading />
  if (!summary) return null

  return (
    <div className={styles['container']}>
      <section className={styles['important-section']}>
        <header className={styles['header']}>
          <Icon name='bookmark' width={34} height={50} />
          <div>
            <h2>
              <UnderlineText>핵심만</UnderlineText> 쏙 모았어요.
            </h2>
            <h2>우리 먼저 여기부터 체크해요!</h2>
          </div>
        </header>

        <AnalysisSummarySection items={summary.summary} />
      </section>

      <section className={styles['warning-section']}>
        <header className={styles['header']}>
          <Icon name='warning' width={37} height={49} />
          <div>
            <h2>
              <UnderlineText>놓치지 쉬운 부분</UnderlineText>이에요.
            </h2>
            <h2>가기 전에 한 번 더 확인해요!</h2>
          </div>
        </header>

        <AnalysisSummarySection items={summary.warning} />
      </section>
    </div>
  )
}
