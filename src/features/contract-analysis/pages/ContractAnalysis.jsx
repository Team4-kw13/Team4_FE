import { BackButton } from '@/components/BackButton/BackButton'
import { useStep } from '@/stores/useStep'

import { ContractAnalysisMain } from '../main/pages/ContractAnalysisMain'
import { ContractAnalysisUpload } from '../upload/pages/ContractAnalysisUpload'

import styles from './ContractAnalysis.module.css'

export const ContractAnalysis = () => {
  const { currentStep, goToNextStep, goToPrevStep, reset } = useStep(3)

  return (
    <div className={styles['container']}>
      <nav className={styles['back-button']}>
        <BackButton onClick={goToPrevStep} />
      </nav>

      {currentStep === 1 && <ContractAnalysisMain goToNextStep={goToNextStep} />}
      {currentStep === 2 && <ContractAnalysisUpload goToNextStep={goToNextStep} />}
    </div>
  )
}
