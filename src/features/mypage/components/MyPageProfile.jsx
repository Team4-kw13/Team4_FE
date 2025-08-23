import { useEffect } from 'react'

import { useMypage } from '../hooks/useMypage'

import styles from './MyPageProfile.module.css'

/** 마이페이지 상단 프로필 */
export const MyPageProfile = () => {
  const { data, loading, error, refetch } = useMypage()

  useEffect(() => {
    refetch()
  }, [refetch])

  if (loading) return null
  if (error) return <p>오류발생</p>

  const nickname = data?.nickname ?? '사용자'

  return (
    <header className={styles.container}>
      <div className={styles.avatar}></div>
      <h2 className={styles.name}>{nickname}</h2>
      <button className={styles['edit-button']}>내 정보 수정</button>
    </header>
  )
}
