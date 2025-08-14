import styles from './AnalysisSummarySection.module.css'

/**
 * @typedef {Object} AnalysisSummarySectionItem
 * @property {string} title 섹션 제목
 * @property {string} subTitle 섹션 부제목
 * @property {string[]} content 각 항목의 상세 문단 배열
 */

/**
 * @typedef {Object} AnalysisSummarySectionProps
 * @property {AnalysisSummarySectionItem[]} items 렌더링할 데이터 배열
 */

/**
 * 분석 요약 섹션 컴포넌트
 *
 * @param {AnalysisSummarySectionProps} props
 * @returns {JSX.Element}
 */

export const AnalysisSummarySection = ({ items }) => {
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
