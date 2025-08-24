import styles from './Loading.module.css'

export const Loading = () => {
  return (
    <div className={styles['container']}>
      <p className={styles['title']}>로딩 중</p>
      <p className={styles['loading-text']}>잠시만 기다려주세요.</p>

      <div className={styles['dot-container']}>
        <div className={styles['dot']} />
        <div className={styles['dot']} />
        <div className={styles['dot']} />
      </div>
    </div>
  )
}
