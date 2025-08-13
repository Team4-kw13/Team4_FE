import { Icon } from '@/components/Icon/Icon'

import styles from './ContractAnalysisDownloadButton.module.css'

export const ContractAnalysisDownloadButton = () => {
  return (
    <button className={styles['button']}>
      <Icon name='download' width={24} height={24} />
    </button>
  )
}
