import { Link } from 'react-router-dom'

import { Icon } from '@/components/Icon/Icon'
import { ROUTES } from '@/router/routes.constant'

import styles from './ListSiteLawyerHeader.module.css'

/**
 * 변호사 리스트 상단 헤더
 */

export const ListSiteLawyerHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3 className={styles.title}>변호사</h3>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>AD LAWYERS</span>
          <span className={styles.adBadge}>광고</span>
        </div>
      </div>

      <Link to={ROUTES.LIST_LAWYER} className={styles.more}>
        더보기
        <Icon name='plus' width={16} height={16} />
      </Link>
    </div>
  )
}
