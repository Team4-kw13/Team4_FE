import { BackButton } from '@/components/back-button/BackButton'

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

      <section className={styles['scroll-section']}>
        <ListSiteAdviceList />
        <ListSiteLawyerHeader />
        <ListSiteLawyerList />
      </section>
    </div>
  )
}
