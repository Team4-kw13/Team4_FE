import { StepProgress } from '@/components/StepProgress/StepProgress'

import { ContractAnalysisDownloadButton } from '../components/ContractAnalysisDownloadButton'
import { ContractAnalysisTooltip } from '../components/ContractAnalysisTooltip'

import styles from './ContractAnalysisTranslate.module.css'

export const ContractAnalysisTranslate = () => {
  return (
    <div className={styles['container']}>
      <header className={styles['header']}>
        <h2>한집말이가 번역을 했어요!</h2>
        <h2>같이 꼼꼼하게 확인해볼까요?</h2>
      </header>

      <section className={styles['analysis-image']}>
        <ContractAnalysisDownloadButton />

        <div className={styles['progress']}>
          <StepProgress />
        </div>

        <ContractAnalysisTooltip />
      </section>
    </div>
  )
}
