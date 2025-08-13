import { BackButton } from '@/components/BackButton/BackButton'
import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton'

import { ContractAnalysisHeader } from '../components/ContractAnalysisHeader'
import { ContractAnalysisStepList } from '../components/ContractAnalysisStepList'

import styles from './ContractAnalysis.module.css'

export const ContractAnalysis = () => {
  return (
    <div className={styles['container']}>
      <nav className={styles['back-button']}>
        <BackButton />
      </nav>

      <section className={styles['header']}>
        <ContractAnalysisHeader />
      </section>

      <section className={styles['analysis-step']}>
        <ContractAnalysisStepList />
      </section>

      <div className={styles['start-button']}>
        <PrimaryButton size='lg' label='시작하기' />
      </div>
    </div>
  )
}
