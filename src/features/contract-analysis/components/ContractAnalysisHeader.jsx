import { Icon } from '@/components/Icon/Icon'

import styles from './ContractAnalysisHeader.module.css'

/**
 * 계약서 분석 페이지 상단 헤더 컴포넌
 */
export const ContractAnalysisHeader = () => {
  return (
    <header className={styles['container']}>
      <Icon name='note' width={58} height={60} />
      <div className={styles['text-container']}>
        <h2 className={styles['text']}>계약서 분석은</h2>
        <h2 className={styles['text']}>이렇게 진행돼요!</h2>
      </div>
    </header>
  )
}
