import { Icon } from '@/components/Icon/Icon'

import styles from './ListContractItem.module.css'

export default function ListContractItem({ title, description, onClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.nameRow}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      <button className={styles.iconButton} onClick={onClick} aria-label='상담하기'>
        <Icon name='caret' width={18} height={18} />
      </button>
    </div>
  )
}
