import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { BackButton } from '@/components/BackButton/BackButton'
import { ContractAnalysisResult } from '@/features/contract-analysis-result/pages/ContractAnalysisResult'
import { UploadedImagesProvider } from '@/stores/UploadedImagesProvider'
import { useStep } from '@/stores/useStep'

import { ContractAnalysisMain } from '../pages/ContractAnalysisMain'
import { ContractAnalysisUpload } from '../pages/ContractAnalysisUpload'

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
  const navigate = useNavigate()
  const { currentStep, goToNextStep, goToPrevStep, reset: resetStep } = useStep(3)

  useEffect(() => {
    resetStep()
  }, [resetStep])

  const handleClickBackButton = () => {
    if (currentStep === 1) navigate(-1)
    else goToPrevStep()
  }

  return (
    <UploadedImagesProvider>
      <div className={styles['container']}>
        <nav className={styles['back-button']}>
          <BackButton onClick={handleClickBackButton} />
        </nav>

        {currentStep === 1 && <ContractAnalysisMain goToNextStep={goToNextStep} />}
        {currentStep === 2 && <ContractAnalysisUpload goToNextStep={goToNextStep} />}
        {currentStep === 3 && <ContractAnalysisResult goToNextStep={goToNextStep} />}
      </div>
    </UploadedImagesProvider>
  )
}
