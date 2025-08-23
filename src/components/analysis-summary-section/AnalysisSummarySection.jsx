import styles from './AnalysisSummarySection.module.css'

/**
 * 분석 요약 섹션 컴포넌트
 *
 * @returns {JSX.Element}
 */

export const AnalysisSummarySection = ({ items }) => {
  if (!items) return null

  return (
    <div className={styles['container']}>
      {items.map(({ title, subTitle, content }) => (
        <div key={title} className={styles['item']}>
          <h4 className={styles['item-title']}>{title}</h4>
          <h5 className={styles['item-subtitle']}>{subTitle}</h5>
          <div className={styles['item-content']}>
            {content.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
