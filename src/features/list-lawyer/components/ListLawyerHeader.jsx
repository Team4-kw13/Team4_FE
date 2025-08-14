import styles from './ListLawyerHeader.module.css'

export const ListLawyerHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3 className={styles.title}>변호사</h3>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>AD LAWYERS</span>
          <span className={styles.adBadge}>광고</span>
        </div>
      </div>
    </div>
  )
}
