import { BackButton } from '@/components/BackButton/BackButton'
import { useStep } from '@/stores/useStep'

import { ContractAnalysisResult } from '../result/pages/ContractAnalysisResult'

import styles from './ContractAnalysis.module.css'

export const ContractAnalysis = () => {
  const { currentStep, goToNextStep, goToPrevStep, reset } = useStep(3)

  return (
    <div className={styles['container']}>
      <nav className={styles['back-button']}>
        <BackButton onClick={goToPrevStep} />
      </nav>

      <ContractAnalysisResult goToNextStep={goToNextStep} />
      {/* {currentStep === 1 && <ContractAnalysisMain goToNextStep={goToNextStep} />}
      {currentStep === 2 && <ContractAnalysisUpload goToNextStep={goToNextStep} />}
      {currentStep === 3 && <ContractAnalysisResult goToNextStep={goToNextStep} />} */}
    </div>
  )
}
