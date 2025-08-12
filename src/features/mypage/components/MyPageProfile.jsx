import styles from './MyPageProfile.module.css'

/**
 * 마이페이지 상단 프로필 컴포넌트
 */
export const MyPageProfile = () => {
  return (
    <header className={styles['container']}>
      <div className={styles['avatar']}></div>
      <h2 className={styles['name']}>peng</h2>
      <button className={styles['edit-button']}>내 정보 수정</button>
    </header>
  )
}
