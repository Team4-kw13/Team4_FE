import styles from './UnderlineText.module.css'

/**
 * @typedef {Object} UnderlineTextProps
 * @property {import('react').ReactNode} children 밑줄을 적용할 텍스트/노드
 */

/**
 * 텍스트에 노란색 밑줄을 적용하는 컴포넌트
 *
 * @param {UnderlineTextProps} props
 * @returns {JSX.Element}
 */

export const UnderlineText = ({ children }) => {
  return <span className={styles['underline']}>{children}</span>
}
