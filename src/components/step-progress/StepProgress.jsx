import cx from 'classnames'

import styles from './StepProgress.module.css'

/**
 * @typedef {Object} StepProgressProps
 * @property {number} [totalSteps=3] 전체 스텝 수(1 이상 정수).
 * @property {number} [currentStep=1] 현재 스텝(1 기반: 1~totalSteps). 범위를 벗어나면 내부에서 자동 보정.
 * @property {string} [className] 추가 클래스명.
 * @property {import('react').HTMLAttributes<HTMLDivElement>} [rest] div에 전달할 나머지 DOM 속성(aria-* 포함).
 */

/**
 * 현재 스텝만 표시하는 단계형 표시 컴포넌트
 *
 * - 항상 현재 스텝 하나만 노란 막대로 표시
 * - 진행률 개념 없이 “현재 위치 표시”에만 사용
 *
 * @param {StepProgressProps} props
 * @returns {JSX.Element}
 */
export const StepProgress = ({ totalSteps = 3, currentStep = 1, className = '', ...rest }) => {
  const clampedCurrent = Math.min(Math.max(currentStep, 1), totalSteps)

  console.log(currentStep)

  return (
    <div
      className={cx(styles['container'], className)}
      aria-label={`현재 ${clampedCurrent}단계`}
      {...rest}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <span
          key={index}
          className={cx(styles['segment'], { [styles['active']]: index + 1 === clampedCurrent })}
          aria-current='step'
        />
      ))}
    </div>
  )
}
