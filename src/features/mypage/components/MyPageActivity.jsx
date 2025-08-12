import { Icon } from '@/components/Icon/Icon'

import styles from './MyPageActivity.module.css'

/**
 * 마이페이지 - 나의 활동 영역
 */
export const MyPageActivity = () => {
  return (
    <section className={styles['container']}>
      <span className={styles['section-title']}>나의 활동</span>
      <div className={styles['item']}>
        <span className={styles['item-title']}>나의 계약서</span>
        <button className={styles['icon-button']} aria-label='나의 계약서'>
          <Icon name='caret' width={18} height={18} />
        </button>
      </div>
    </section>
  )
}

export default MyPageActivity
