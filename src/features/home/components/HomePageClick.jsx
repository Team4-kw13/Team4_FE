import { Icon } from '@/components/Icon/Icon'

import styles from './HomePageClick.module.css'

export const HomePageClick = () => {
  return (
    <section className={styles.container}>
      <p className={styles.bubble}>저를 눌러서 계약서 분석하러 가요!</p>

      {/* 히어로(아이콘) */}
      <button type='button' className={styles.heroBtn} aria-label='계약서 분석 바로가기'>
        <Icon name='note' width={157} height={162} />
      </button>

      {/* 타원 */}
      <div className={styles.oval} aria-hidden />

      {/* CLICK! - 버튼 아님, 텍스트 */}
      <p className={styles.cta}>CLICK!</p>
    </section>
  )
}
