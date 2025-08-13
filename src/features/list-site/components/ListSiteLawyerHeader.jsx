import { Icon } from '@/components/Icon/Icon'

import styles from './ListSiteLawyerHeader.module.css'

/**
 * 변호사 리스트 상단 헤더
 * @param {object} props
 * @param {number} [props.count]  - 변호사 수(뱃지에 표시)
 * @param {() => void} [props.onMore] - 우측 "더보기" 클릭 핸들러
 * @param {string} [props.moreHref]   - 링크 사용 시 href 전달(있으면 <a>, 없으면 <button>)
 */
export const ListSiteLawyerHeader = ({ onMore, moreHref }) => {
  const More = moreHref
    ? (p) => (
        <a className={styles.modure} href={moreHref} {...p}>
          더보기
          <Icon name='plus' width={16} height={16} />
        </a>
      )
    : (p) => (
        <button type='button' className={styles.more} onClick={onMore} {...p}>
          더보기
          <Icon name='plus' width={16} height={16} />
        </button>
      )

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3 className={styles.title}>변호사</h3>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>AD LAWYERS</span>
          <span className={styles.adBadge}>광고</span>
        </div>
      </div>

      <More aria-label='변호사 더보기'>
        <span className={styles.moreText}>더보기</span>
        <span aria-hidden className={styles.chevron}>
          ›
        </span>
      </More>
    </div>
  )
}
