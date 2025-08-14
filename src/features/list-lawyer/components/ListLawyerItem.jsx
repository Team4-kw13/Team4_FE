import { Icon } from '@/components/Icon/Icon'

import styles from './ListLawyerItem.module.css'

export default function ListLawyerItem({ title, lawFirm, description, onClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.nameRow}>
          <h3 className={styles.title}>{title}</h3>
          {lawFirm && <span className={styles.lawFirm}>{lawFirm}</span>}
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      <button className={styles.iconButton} onClick={onClick} aria-label='상담하기'>
        <Icon name='message' width={24} height={24} />
      </button>
    </div>
  )
}
