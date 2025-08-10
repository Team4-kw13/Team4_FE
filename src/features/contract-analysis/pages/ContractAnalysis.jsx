import { BackButton } from '@/components/BackButton/BackButton'

import { ContractAnalysisHeader } from '../components/ContractAnalysisHeader'
import { ContractAnalysisStartButton } from '../components/ContractAnalysisStartButton'
import { ContractAnalysisStepList } from '../components/ContractAnalysisStepList'

import styles from './ContractAnalysis.module.css'

export const ContractAnalysis = () => {
  return (
    <div className={styles['container']}>
      <nav className={styles['back-button']}>
        <BackButton />
      </nav>

      <section className={styles['analysis-step']}>
        <ContractAnalysisHeader />
        <ContractAnalysisStepList />
      </section>

      <div className={styles['start-button']}>
        <ContractAnalysisStartButton />
      </div>
    </div>
  )
}
