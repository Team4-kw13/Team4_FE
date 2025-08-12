import { Icon } from '@/components/Icon/Icon'

import styles from './MyPageSupport.module.css'

/**
 * 마이페이지 - 나의 설정 영역
 */
export const MyPageSupport = () => {
  return (
    <section className={styles['container']}>
      <section className={styles['inner-container']}>
        <span className={styles['section-title']}>고객 지원</span>
        <div className={styles['item']}>
          <span className={styles['item-title']}>고객센터</span>
          <button className={styles['icon-button']} aria-label='고객센터'>
            <Icon name='caret' width={18} height={18} />
          </button>
        </div>
        <div className={styles['item']}>
          <span className={styles['item-title']}>약관 및 정책</span>
          <button className={styles['icon-button']} aria-label='약관 및 정책'>
            <Icon name='caret' width={18} height={18} />
          </button>
        </div>
        <div className={styles['item']}>
          <span className={styles['item-title']}>로그아웃</span>
          <button className={styles['icon-button']} aria-label='로그아웃'>
            <Icon name='caret' width={18} height={18} />
          </button>
        </div>
        <div className={styles['item']}>
          <span className={styles['item-title']}>탈퇴하기</span>
          <button className={styles['icon-button']} aria-label='탈퇴하기'>
            <Icon name='caret' width={18} height={18} />
          </button>
        </div>
      </section>
    </section>
  )
}

export default MyPageSupport
