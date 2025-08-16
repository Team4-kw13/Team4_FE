import { HomePageAnalysis } from '../components/HomePageAnalysis'
import { HomePageClick } from '../components/HomePageClick'
import { HomePageHeader } from '../components/HomePageHeader'
import { HomePageLegal } from '../components/HomePageLegal'

import styles from './HomePage.module.css'

export const HomePage = () => {
  return (
    <div className={styles['container']}>
      <section className={styles['bg-container']}>
        <HomePageHeader />
        <HomePageClick />
      </section>

      <div className={styles.cardsRow}>
        <HomePageAnalysis />
        <HomePageLegal />
      </div>
    </div>
  )
}
