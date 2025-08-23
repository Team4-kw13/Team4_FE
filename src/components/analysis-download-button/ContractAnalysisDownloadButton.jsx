import { useState } from 'react'
import html2canvas from 'html2canvas'

import { Icon } from '@/components/Icon/Icon'

import styles from './ContractAnalysisDownloadButton.module.css'

/**
 * @typedef {Object} ContractAnalysisDownloadButtonProps
 * @property {Array<import('react').RefObject<HTMLElement>>} refs PNG로 저장할 대상 DOM 요소들의 ref 배열
 * @property {(index: number) => string} [getFileName] 파일명 생성 함수 (기본: "번역본 {index+1}.png")
 */

/**
 * 계약서 결과를 PNG 이미지로 일괄 다운로드하는 버튼 컴포넌트
 *
 * - 각 ref가 가리키는 DOM을 html2canvas로 캡처하여 PNG로 저장
 * - 메모리 사용을 줄이기 위해 순차적으로(await) 처리
 *
 * @param {ContractAnalysisDownloadButtonProps} props
 * @returns {JSX.Element}
 */
export const ContractAnalysisDownloadButton = ({ refs, getFileName }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const resolveName = typeof getFileName === 'function' ? getFileName : (i) => `번역본 ${i + 1}.png`

  const html2canvasOptions = {
    scale: 2,
    useCORS: true,
  }

  const downloadAll = async () => {
    if (isDownloading) return
    setIsDownloading(true)

    try {
      for (let i = 0; i < refs.length; i++) {
        const element = refs[i]?.current
        if (!element) continue

        const canvas = await html2canvas(element, html2canvasOptions)

        await new Promise((resolve) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) return resolve()
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = resolveName(i)
              a.click()
              URL.revokeObjectURL(url)
              resolve()
            },
            'image/png',
            1.0,
          )
        })
      }
    } catch (err) {
      console.error('다운로드 중 오류:', err)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      className={styles['button']}
      onClick={downloadAll}
      aria-disabled={isDownloading}
      title={isDownloading ? '이미지 저장 중...' : '이미지 저장'}
    >
      <Icon name='download' width={24} height={24} />
    </button>
  )
}
