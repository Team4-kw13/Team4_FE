import classNames from 'classnames'

import styles from './ContractAnalysisStepItem.module.css'

/**
 * @typedef {Object} ContractAnalysisStepItemProps
 * @property {number}  index 스텝 번호 (1부터 시작 권장)
 * @property {string}  title 스텝 제목
 * @property {string} [description] 스텝에 대한 상세 설명 (옵션)
 * @property {boolean} [isLast=false] 마지막 스텝 여부 (true면 커넥터 숨김)
 * @property {boolean} [isConnectorLong=false] 커넥터 길이 확장 여부
 */

/**
 * 계약서 분석 메인 페이지의 단일 스텝 아이템
 * @param {ContractAnalysisStepItemProps} props
 */

export const ContractAnalysisStepItem = ({
  index,
  title,
  description,
  isLast = false,
  isConnectorLong = false,
}) => {
  const stepNumberClass = classNames(styles['step-number'], {
    [styles['step-number--last']]: isLast,
  })

  const connectorClass = classNames(styles['step-connector'], {
    [styles['step-connector--long']]: isConnectorLong,
  })

  return (
    <li className={styles['container']}>
      <div className={styles['step']}>
        <div className={stepNumberClass}>{index}</div>
        {!isLast && <div className={connectorClass} aria-hidden />}
      </div>

      <div className={styles['text-container']}>
        <p className={styles['title']}>{title}</p>
        {!!description && <p className={styles['description']}>{description}</p>}
      </div>
    </li>
  )
}
