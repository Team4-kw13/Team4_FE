import { useEffect } from 'react'

import { BackButton } from '@/components/BackButton/BackButton'
import { DocumentAnalysisProvider } from '@/stores/DocumentAnalysisProvider'
import { useDocumentAnalysisContext } from '@/stores/useDocumentAnalysisContext'
import { useStep } from '@/stores/useStep'

import { ContractAnalysisMain } from '../pages/ContractAnalysisMain'
import { ContractAnalysisResult } from '../pages/ContractAnalysisResult'
import { ContractAnalysisUpload } from '../pages/ContractAnalysisUpload'
import { UploadedImagesProvider } from '../stores/UploadedImagesProvider'

import styles from './ContractAnalysis.module.css'

/**
 * 계약서 분석 플로우의 루트 컨테이너
 *
 * - 진입 시 스텝 및 문서 컨텍스트 초기화
 * - 전역 Provider로 감쌈
 * - 화면 전환(3단계):
 *   1) <ContractAnalysisMain />: 시작 화면
 *   2) <ContractAnalysisUpload />: 업로드 화면
 *   3) <ContractAnalysisResult />: 결과 화면
 *
 * @returns {JSX.Element}
 */

export const ContractAnalysis = () => {
  const { currentStep, goToNextStep, goToPrevStep, reset: resetStep } = useStep(3)
  const {
    actions: { reset: resetContext },
  } = useDocumentAnalysisContext()

  useEffect(() => {
    resetStep()
    resetContext()
  }, [resetContext, resetStep])

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
