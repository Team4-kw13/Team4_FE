import { BackButton } from '@/components/back-button/BackButton'
import { ListContractHeader } from '@/features/list-contract/components/ListContractHeader'
import { ListContractList } from '@/features/list-contract/components/ListContractList'
import { ROUTES } from '@/router/routes.constant'

import styles from './ListContract.module.css'

export const ListContract = () => {
  return (
    <div className={styles['container']}>
      <nav className={styles['back-button']}>
        <BackButton to={ROUTES.HOMEPAGE} />
      </nav>

      <ListContractHeader />
      <ListContractList />
    </div>
  )
}
