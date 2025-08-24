import { Link } from 'react-router-dom'

import { Icon } from '@/components/Icon/Icon'
import { ROUTES } from '@/router/routes.constant'

import styles from './ListContractItem.module.css'

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso) // '2025-08-23T06:59:33.884' 같은 ISO 처리
  if (Number.isNaN(d.getTime())) return iso // 파싱 실패시 원문 표시
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`
}

export default function ListContractItem({ contractId, contractName, description }) {
  const displayName = contractName && contractName.trim() ? contractName : '제목 없음'
  const displayDate = formatDate(description)

  return (
    <Link to={ROUTES.ANALYSIS_HISTORY(contractId)} className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.nameRow}>
          <h3 className={styles.title}>{displayName}</h3>
        </div>
        {displayDate && <p className={styles.description}>{displayDate}</p>}
      </div>
      <Icon name='caret' width={18} height={18} />
    </Link>
  )
}
