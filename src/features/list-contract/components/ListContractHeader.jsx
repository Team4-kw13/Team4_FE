import { Icon } from '@/components/Icon/Icon'

import styles from './ListContractHeader.module.css'

export const ListContractHeader = () => {
  return (
    <header className={styles['container']}>
      <Icon name='folder' width={58} height={60} />
      <div className={styles['text-container']}>
        <h2 className={styles['text']}>나의 계약서들</h2>
      </div>
    </header>
  )
}
