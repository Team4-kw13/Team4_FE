import { Link } from 'react-router-dom'

import { Icon } from '@/components/Icon/Icon'
import { ROUTES } from '@/router/routes.constant'

import styles from './HomePageAnalysis.module.css'

export const HomePageAnalysis = () => {
  return (
    <Link to={ROUTES.ANALYSIS_HISTORY} className={styles.card}>
      <Icon name='folder' width={45} height={41} />
      <div className={styles.texts}>
        <p className={styles.desc}>전에 분석한 계약서를 다시 확인해요</p>
        <div className={styles.action}>
          <span>분석 조회</span>
          <Icon name='select' width={20} height={20} />
        </div>
      </div>
    </Link>
  )
}
