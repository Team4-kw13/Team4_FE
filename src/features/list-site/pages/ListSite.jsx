import { BackButton } from '@/components/BackButton/BackButton'

import { ListSiteAdviceList } from '../components/ListSiteAdviceList'
import { ListSiteHeader } from '../components/ListSiteHeader'
import { ListSiteLawyerHeader } from '../components/ListSiteLawyerHeader'
import { ListSiteLawyerList } from '../components/ListSiteLawyerList'

import styles from './ListSite.module.css'

export const ListSite = () => {
  return (
    <div className={styles['container']}>
      <nav className={styles['back-button']}>
        <BackButton />
      </nav>
      <ListSiteHeader />

      <ListSiteAdviceList />

      <ListSiteLawyerHeader />

      <ListSiteLawyerList />
    </div>
  )
}
