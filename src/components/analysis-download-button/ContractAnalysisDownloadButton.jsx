import html2canvas from 'html2canvas'

import { Icon } from '@/components/Icon/Icon'

import styles from './ContractAnalysisDownloadButton.module.css'

/**
 * @typedef {Object} ContractAnalysisDownloadButtonProps
 * @property {Array<import('react').RefObject<HTMLElement>>} refs - PNG로 저장할 대상 DOM 요소들의 ref 배열
 * @property {(index: number) => string} [getFileName] - 파일명 생성 함수 (기본값: "번역본 {index+1}.png")
 */

/**
 * 계약서 결과를 PNG 이미지로 일괄 다운로드하는 버튼 컴포넌트.
 *
 * - 각 ref가 가리키는 DOM을 html2canvas로 캡처하여 PNG로 저장
 * - 메모리 사용을 줄이기 위해 순차적으로(await) 처리
 *
 * @param {ContractAnalysisDownloadButtonProps} props
 * @returns {import('react').JSX.Element}
 */

export const ContractAnalysisDownloadButton = ({ refs, getFileName }) => {
  const getName = getFileName || ((i) => `번역본 ${i + 1}.png`)

  const mergedOptions = {
    scale: 2,
    useCORS: true,
  }

  const downloadAll = async () => {
    for (let i = 0; i < refs.length; i++) {
      const element = refs[i]?.current
      if (!element) {
        continue
      }

      const canvas = await html2canvas(element, mergedOptions)
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = getName(i)
      a.click()
    }
  }

  return (
    <button className={styles['button']} onClick={downloadAll}>
      <Icon name='download' width={24} height={24} />
    </button>
  )
}
