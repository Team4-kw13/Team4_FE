import { useSummary } from '@/stores/DocumentAnalysisStore'

import styles from './AnalysisSummarySection.module.css'

export const AnalysisWarningSection = () => {
  const summary = useSummary()

  if (!summary?.warning) return null

  return (
    <div className={styles['container']}>
      {summary.warning.map(({ title, subTitle, content }) => (
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
