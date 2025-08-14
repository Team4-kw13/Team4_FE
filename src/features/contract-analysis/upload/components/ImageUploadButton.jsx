import { useRef } from 'react'

import { Icon } from '@/components/Icon/Icon'

import { TOTAL_IMAGE_COUNT } from '../constants/constants'
import { useUploadedImages } from '../hooks/useUploadedImages'

import styles from './ImageUploadButton.module.css'

/**
 * @typedef {Object} ImageUploadButtonProps
 * @property {number} currentFileCount 현재 업로드된 파일 개수
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange 파일 선택 시 실행되는 콜백 함수
 */

/**
 * 이미지 업로드 버튼 컴포넌트
 *
 * @param {ImageUploadButtonProps} props
 * @returns {JSX.Element}
 */

export const ImageUploadButton = ({ currentFileCount, onChange }) => {
  const fileInputRef = useRef(null)
  const { items, handleInputChange } = useUploadedImages()

  const handleClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div className={styles['container']} onClick={handleClick}>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />

      <Icon name='file' width={32} height={32} />
      <span className={styles['counter']}>
        {items.length} / {TOTAL_IMAGE_COUNT}
      </span>
    </div>
  )
}
