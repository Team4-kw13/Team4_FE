import styles from './MyPageProfile.module.css'

/** 마이페이지 상단 프로필 */
export const MyPageProfile = ({ nickname }) => {
  return (
    <header className={styles.container}>
      <div className={styles.avatar}></div>
      <h2 className={styles.name}>{nickname}</h2>
      <button className={styles['edit-button']}>내 정보 수정</button>
    </header>
  )
}
