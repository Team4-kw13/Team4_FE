import { useState } from 'react'
import html2canvas from 'html2canvas'

import { Icon } from '@/components/Icon/Icon'

import styles from './ContractAnalysisDownloadButton.module.css'

/**
 * @typedef {Object} ContractAnalysisDownloadButtonProps
 * @property {Array<import('react').RefObject<HTMLElement>>} refs PNG로 저장할 대상 슬라이드 ref 배열
 * @property {number} activeIndex 현재 저장할 슬라이드 인덱스(0 기반)
 * @property {(index: number) => string} [getFileName] 파일명 생성 함수 (기본: "번역본 {index+1}.png")
 */

/**
 * 현재 슬라이드만 PNG로 다운로드하는 버튼
 *
 * @param {ContractAnalysisDownloadButtonProps} props
 * @returns {JSX.Element}
 */
export const ContractAnalysisDownloadButton = ({ refs, activeIndex, getFileName }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const resolveName = typeof getFileName === 'function' ? getFileName : (i) => `번역본 ${i + 1}.png`

  const html2canvasOptions = { scale: 2, useCORS: true }

  const downloadCurrent = async () => {
    if (isDownloading) return
    setIsDownloading(true)

    try {
      const safeIndex = Math.min(Math.max(0, activeIndex ?? 0), refs.length - 1)
      const element = refs[safeIndex]?.current
      if (!element) return

      const canvas = await html2canvas(element, html2canvasOptions)

      await new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = resolveName(safeIndex)
            a.click()
            URL.revokeObjectURL(url)
            resolve()
          },
          'image/png',
          1.0,
        )
      })
    } catch (err) {
      console.error('다운로드 중 오류:', err)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      className={styles['button']}
      onClick={downloadCurrent}
      aria-disabled={isDownloading}
      title={isDownloading ? '이미지 저장 중' : '현재 슬라이드 저장'}
    >
      <Icon name='download' width={24} height={24} />
    </button>
  )
}
