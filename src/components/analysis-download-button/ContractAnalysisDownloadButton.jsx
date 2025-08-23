import { Icon } from '@/components/Icon/Icon'

import styles from './ContractAnalysisDownloadButton.module.css'

/**
 * @typedef {Object} ContractAnalysisDownloadButtonProps
 * @property {() => void} onDownload 다운로드 버튼 클릭 시 실행되는 콜백 함수
 */

/**
 * 계약서 번역 결과 다운로드 버튼 컴포넌트
 *
 * @param {ContractAnalysisDownloadButtonProps} props
 * @returns {JSX.Element}
 */

export const ContractAnalysisDownloadButton = ({ onDownload }) => {
  return (
    <button className={styles['button']} onClick={onDownload}>
      <Icon name='download' width={24} height={24} />
    </button>
  )
}
