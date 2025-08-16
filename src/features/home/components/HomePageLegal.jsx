import { Link } from 'react-router-dom'

import { Icon } from '@/components/Icon/Icon'
import { ROUTES } from '@/router/routes.constant'

import styles from './HomePageLegal.module.css'

export const HomePageLegal = () => {
  return (
    <Link to={ROUTES.LIST_SITE} className={styles.card}>
      <Icon name='chat' width={45} height={41} />
      <div className={styles.texts}>
        <p className={styles.desc}>
          법률 질문은
          <br />
          전문 상담과 연결해요
        </p>
        <div className={styles.action}>
          <span>법률 상담</span>
          <Icon name='select' width={20} height={20} />
        </div>
      </div>
    </Link>
  )
}
