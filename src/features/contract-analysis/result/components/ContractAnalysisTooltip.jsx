import { Icon } from '@/components/Icon/Icon'

import styles from './ContractAnalysisTooltip.module.css'

export const ContractAnalysisTooltip = () => {
  return (
    <button className={styles['button']}>
      <Icon name='tooltip' width={20} height={20} />
    </button>
  )
}
