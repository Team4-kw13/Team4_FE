import { BackButton } from '@/components/back-button/BackButton'
import { ListLawyerHeader } from '@/features/list-lawyer/components/ListLawyerHeader'
import { ListLawyerList } from '@/features/list-lawyer/components/ListLawyerList'
import { ROUTES } from '@/router/routes.constant'

import styles from './ListLawyer.module.css'

export const ListLawyer = () => {
  return (
    <div className={styles['container']}>
      <nav className={styles['back-button']}>
        <BackButton to={ROUTES.LIST_SITE} />
      </nav>

      <ListLawyerHeader />
      <ListLawyerList />
    </div>
  )
}
