import { Icon } from '@/components/Icon/Icon'

import styles from './ListSiteAdviceItem.module.css'

/**
 * 법률 상담 리스트 아이템 컴포넌트
 */

export default function ListSiteAdviceItem({
  title,
  description,
  onClick,
  showPhoneIcon,
  showViewLink,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {showPhoneIcon && (
        <button className={styles.iconButton} onClick={onClick}>
          <Icon name='phone' width={24} height={24} />
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
