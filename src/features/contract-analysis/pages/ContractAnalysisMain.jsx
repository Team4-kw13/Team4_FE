import { PrimaryButton } from '@/components/primary-button/PrimaryButton'

import { ContractAnalysisHeader } from '../components/ContractAnalysisHeader'
import { ContractAnalysisStepList } from '../components/ContractAnalysisStepList'

import styles from './ContractAnalysisMain.module.css'

/**
 * @typedef {Object} ContractAnalysisMainProps
 * @property {() => void} goToNextStep "시작하기" 버튼 클릭 시 실행할 콜백 함수
 */

/**
 * 계약서 분석 메인 화면 컴포넌트
 *
 * @param {ContractAnalysisMainProps} props
 * @returns {JSX.Element}
 */

export const ContractAnalysisMain = ({ goToNextStep }) => {
  return (
    <>
      <section className={styles['header']}>
        <ContractAnalysisHeader />
      </section>

      <section className={styles['analysis-step']}>
        <ContractAnalysisStepList />
      </section>

      <div className={styles['start-button']}>
        <PrimaryButton size='lg' label='시작하기' onClick={goToNextStep} />
      </div>
    </>
  )
}
