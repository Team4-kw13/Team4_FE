import { Icon } from '@/components/Icon/Icon'

import styles from './HomePageHeader.module.css'

export const HomePageHeader = () => {
  return (
    <header className={styles.container}>
      <span className={styles.title}>한집말이</span>

      <div className={styles.right}>
        <button>
          <Icon name='user' width={32} height={32} />
        </button>
        <span className={styles.name}>peng</span>
      </div>
    </header>
  )
}
