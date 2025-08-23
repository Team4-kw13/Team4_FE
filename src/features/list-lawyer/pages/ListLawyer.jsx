import { BackButton } from '@/components/back-button/BackButton'
import { ListLawyerHeader } from '@/features/list-lawyer/components/ListLawyerHeader'
import { ListLawyerList } from '@/features/list-lawyer/components/ListLawyerList'

import styles from './ListLawyer.module.css'

export const ListLawyer = () => {
  return (
    <div className={styles['container']}>
      <nav className={styles['back-button']}>
        <BackButton />
      </nav>

      <ListLawyerHeader />
      <ListLawyerList />
    </div>
  )
}
