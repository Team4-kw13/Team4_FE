import { Icon } from '@/components/Icon/Icon'

import styles from './MyPageSetting.module.css'

/**
 * 마이페이지 - 나의 설정 영역
 */
export const MyPageSetting = () => {
  return (
    <section className={styles['container']}>
      <span className={styles['section-title']}>설정</span>
      <div className={styles['item']}>
        <span className={styles['item-title']}>언어 설정</span>
        <button className={styles['icon-button']} aria-label='언어 설정'>
          <Icon name='caret' width={18} height={18} />
        </button>
      </div>
    </section>
  )
}

export default MyPageSetting
