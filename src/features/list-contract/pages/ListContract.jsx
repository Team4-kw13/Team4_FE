import { BackButton } from '@/components/BackButton/BackButton'
import { ListContractHeader } from '@/features/list-contract/components/ListContractHeader'
import { ListContractList } from '@/features/list-contract/components/ListContractList'

import styles from './ListContract.module.css'

export const ListContract = () => {
  return (
    <div className={styles['container']}>
      <nav className={styles['back-button']}>
        <BackButton />
      </nav>

      <ListContractHeader />
      <ListContractList />
    </div>
  )
}
