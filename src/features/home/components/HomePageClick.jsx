import { Link } from 'react-router-dom'

import { Icon } from '@/components/Icon/Icon'
import { ROUTES } from '@/router/routes.constant'

import styles from './HomePageClick.module.css'

export const HomePageClick = () => {
  return (
    <section className={styles.container}>
      <div className={styles['bubble-container']}>
        <p className={styles['bubble']}>저를 눌러서 계약서 분석하러 가요!</p>
      </div>

      <Link to={ROUTES.CONTRACT_ANALYSIS} aria-label='계약서 분석 바로가기'>
        <Icon name='note' width={157} height={162} className={styles.heroBtn} />
        <div className={styles.oval} aria-hidden />
        <p className={styles.cta}>CLICK!</p>
      </Link>

      <div>
        <div className={styles['bg-1']} />
        <div className={styles['bg-2']} />
        <div className={styles['bg-3']} />
      </div>
    </section>
  )
}
