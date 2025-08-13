import { BackButton } from '@/components/BackButton/BackButton'
import { useStep } from '@/stores/useStep'

import { ContractAnalysisMain } from '../main/pages/ContractAnalysisMain'

import styles from './ContractAnalysis.module.css'

export const ContractAnalysis = () => {
  const { currentStep, goToNextStep, goToPrevStep, reset } = useStep(3)

  return (
    <div className={styles['container']}>
      <nav className={styles['back-button']}>
        <BackButton onClick={goToPrevStep} />
      </nav>

      <ContractAnalysisMain />
    </div>
  )
}
