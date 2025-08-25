import { useEffect } from 'react'

import { BackButton } from '@/components/back-button/BackButton'
import { ROUTES } from '@/router/routes.constant'

import { MyPageActivity } from '../components/MyPageActivity'
import { MyPageProfile } from '../components/MyPageProfile'
import { MyPageSetting } from '../components/MyPageSetting'
import { MyPageSupport } from '../components/MyPageSupport'
import { useMypage } from '../hooks/useMypage'

import styles from './MyPage.module.css'

export const MyPage = () => {
  const { data, loading, error, refetch } = useMypage()

  useEffect(() => {
    refetch()
  }, [refetch])

  if (loading) return null
  if (error) return <p>오류발생</p>

  const nickname = data?.nickname ?? '사용자'

  return (
    <div className={styles['container']}>
      {/* 상단 뒤로가기 버튼 */}
      <nav className={styles['back-button']}>
        <BackButton to={ROUTES.HOMEPAGE} />
      </nav>

      {/* 프로필 영역 */}
      <MyPageProfile nickname={nickname} />

      {/* 활동 영역 */}
      <MyPageActivity />

      {/* 설정 영역 */}
      <MyPageSetting />

      {/* 지원 영역 */}
      <MyPageSupport />
    </div>
  )
}
