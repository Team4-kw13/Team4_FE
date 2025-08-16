import { Link } from 'react-router-dom'

import { Icon } from '@/components/Icon/Icon'
import { ROUTES } from '@/router/routes.constant'

import styles from './HomePageHeader.module.css'

export const HomePageHeader = () => {
  return (
    <header className={styles.container}>
      <span className={styles.title}>한집말이</span>

      <Link to={ROUTES.MYPAGE} className={styles.right}>
        <Icon name='user' width={32} height={32} />
        <span className={styles.name}>peng</span>
      </Link>
    </header>
  )
}
