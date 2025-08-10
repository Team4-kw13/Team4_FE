import { contractAnalysisSteps } from '../constants/contractAnalysisSteps'

import { ContractAnalysisStepItem } from './ContractAnalysisStepItem'

import styles from './ContractAnalysisStepList.module.css'

/**
 * @typedef {Object} Step
 * @property {string} title 스텝 제목
 * @property {string} [description] 스텝 설명
 */

/**
 * 계약서 분석 온보딩 페이지의 스텝 리스트 컴포넌트
 */

export const ContractAnalysisStepList = () => {
  return (
    <ul className={styles['container']}>
      {contractAnalysisSteps.map(({ title, description }, index) => {
        const isLast = index === contractAnalysisSteps.length - 1
        const isConnectorLong = index === contractAnalysisSteps.length - 2

        return (
          <ContractAnalysisStepItem
            key={`${index}-${title}`}
            index={index + 1}
            title={title}
            description={description}
            isLast={isLast}
            isConnectorLong={isConnectorLong}
          />
        )
      })}
    </ul>
  )
}
