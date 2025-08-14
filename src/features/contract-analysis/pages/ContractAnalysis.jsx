import { useEffect } from 'react'

import { BackButton } from '@/components/BackButton/BackButton'
import { useStep } from '@/stores/useStep'

import { ContractAnalysisMain } from '../pages/ContractAnalysisMain'
import { ContractAnalysisResult } from '../pages/ContractAnalysisResult'
import { ContractAnalysisUpload } from '../pages/ContractAnalysisUpload'
import { DocumentAnalysisProvider } from '../stores/DocumentAnalysisProvider'
import { UploadedImagesProvider } from '../stores/UploadedImagesProvider'

import styles from './ContractAnalysis.module.css'

/**
 * 계약서 분석 플로우의 루트 컨테이너
 *
 * - 페이지 진입 시 `reset()`으로 스텝 상태를 초기화
 * - 업로드된 이미지 전역 상태를 `UploadedImagesProvider`로 감쌈
 *
 * @returns {JSX.Element}
 */

export const ContractAnalysis = () => {
  const { currentStep, goToNextStep, goToPrevStep, reset } = useStep(3)

  useEffect(() => {
    reset()
  }, [reset])

  return (
    <DocumentAnalysisProvider>
      <UploadedImagesProvider>
        <div className={styles['container']}>
          <nav className={styles['back-button']}>
            <BackButton onClick={goToPrevStep} />
          </nav>

          {currentStep === 1 && <ContractAnalysisMain goToNextStep={goToNextStep} />}
          {currentStep === 2 && <ContractAnalysisUpload goToNextStep={goToNextStep} />}
          {currentStep === 3 && <ContractAnalysisResult goToNextStep={goToNextStep} />}
        </div>
      </UploadedImagesProvider>
    </DocumentAnalysisProvider>
  )
}
