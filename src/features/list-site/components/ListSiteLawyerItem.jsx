import { Icon } from '@/components/Icon/Icon'

import styles from './ListSiteLawyerItem.module.css'

/**
 * 변호사 리스트 아이템 컴포넌트
 */

export default function ListSiteLawyerItem({
  title,
  lawFirm,
  description,
  onClick,
  showPhoneIcon,
  showViewLink,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.nameRow}>
          <h3 className={styles.title}>{title}</h3>
          {lawFirm && <span className={styles.lawFirm}>{lawFirm}</span>}
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      {showPhoneIcon && (
        <button className={styles.iconButton} onClick={onClick}>
          <Icon name='message' width={24} height={24} />
        </button>
      )}

      {showViewLink && (
        <button className={styles.viewButton} onClick={onClick}>
          보기
        </button>
      )}
    </div>
  )
}
