import { Icon } from '@/components/Icon/Icon'

import styles from './ContractAnalysisLoading.module.css'

export const ContractAnalysisLoading = () => {
  return (
    <div className={styles['container']} r>
      <Icon name='note' width={120} height={124} />
      <p className={styles['loading-text']}>분석 중</p>
      <div className={styles['dot-container']}>
        <div className={styles['dot']} />
        <div className={styles['dot']} />
        <div className={styles['dot']} />
      </div>
    </div>
  )
}
