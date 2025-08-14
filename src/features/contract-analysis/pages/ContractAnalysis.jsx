import { BackButton } from '@/components/BackButton/BackButton'
import { useStep } from '@/stores/useStep'

import { ContractAnalysisMain } from '../main/pages/ContractAnalysisMain'
import { ContractAnalysisResult } from '../result/pages/ContractAnalysisResult'
import { UploadedImagesProvider } from '../stores/UploadedImagesProvider'
import { ContractAnalysisUpload } from '../upload/pages/ContractAnalysisUpload'

import styles from './ContractAnalysis.module.css'

export const ContractAnalysis = () => {
  const { currentStep, goToNextStep, goToPrevStep, reset } = useStep(3)

  return (
    <UploadedImagesProvider>
      <div className={styles['container']}>
        <nav className={styles['back-button']}>
          <BackButton onClick={goToPrevStep} />
        </nav>

        {/* <ContractAnalysisResult goToNextStep={goToNextStep} /> */}
        {currentStep === 1 && <ContractAnalysisMain goToNextStep={goToNextStep} />}
        {currentStep === 2 && <ContractAnalysisUpload goToNextStep={goToNextStep} />}
        {currentStep === 3 && <ContractAnalysisResult goToNextStep={goToNextStep} />}
      </div>
    </UploadedImagesProvider>
  )
}
