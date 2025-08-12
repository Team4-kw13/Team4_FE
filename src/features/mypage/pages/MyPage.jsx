import { BackButton } from '@/components/BackButton/BackButton'

import { MyPageActivity } from '../components/MyPageActivity'
import { MyPageProfile } from '../components/MyPageProfile'
import { MyPageSetting } from '../components/MyPageSetting'
import { MyPageSupport } from '../components/MyPageSupport'

import styles from './MyPage.module.css'

export const MyPage = () => {
  return (
    <div className={styles['container']}>
      {/* 상단 뒤로가기 버튼 */}
      <nav className={styles['back-button']}>
        <BackButton />
      </nav>

      {/* 프로필 영역 */}
      <MyPageProfile />

      {/* 활동 영역 */}
      <MyPageActivity />

      {/* 설정 영역 */}
      <MyPageSetting />

      {/* 지원 영역 */}
      <MyPageSupport />
    </div>
  )
}
