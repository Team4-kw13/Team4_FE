import { useState } from 'react'

import { Icon } from '@/components/Icon/Icon'

import styles from './ContractAnalysisTooltip.module.css'

/**
 * 계약서 분석 툴팁 컴포넌트
 *
 * - 버튼 클릭 시 안내 문구가 담긴 툴팁을 토글하여 표시
 */

export const ContractAnalysisTooltip = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <button className={styles['button']} onClick={handleClick}>
        <Icon name='tooltip' width={20} height={20} />
      </button>

      {isOpen && (
        <div className={styles['tooltip-container']}>
          <p className={styles['tooltip-message']}>
            {`번역 및 분석 결과는 AI가 생성한 내용으로, 실제 계약서와 차이가 있을 수 있습니다.\r\n중요한 조항 및 금액은 반드시 원본 계약서와 대조하여 확인해주세요.`}
          </p>
        </div>
      )}
    </>
  )
}
