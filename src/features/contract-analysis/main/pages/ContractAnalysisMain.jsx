import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton'

import { ContractAnalysisHeader } from '../components/ContractAnalysisHeader'
import { ContractAnalysisStepList } from '../components/ContractAnalysisStepList'

import styles from './ContractAnalysisMain.module.css'

export const ContractAnalysisMain = () => {
  return (
    <>
      <section className={styles['header']}>
        <ContractAnalysisHeader />
      </section>

      <section className={styles['analysis-step']}>
        <ContractAnalysisStepList />
      </section>

      <div className={styles['start-button']}>
        <PrimaryButton size='lg' label='시작하기' />
      </div>
    </>
  )
}
