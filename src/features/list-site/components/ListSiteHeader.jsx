import { Icon } from '@/components/Icon/Icon'

import styles from './ListSiteHeader.module.css'

/**
 * 법률 상담 상단 헤더 컴포넌트
 */
export const ListSiteHeader = () => {
  return (
    <header className={styles['container']}>
      <Icon name='chat' width={58} height={60} />
      <div className={styles['text-container']}>
        <h2 className={styles['text']}>법률 상담</h2>
      </div>
    </header>
  )
}
