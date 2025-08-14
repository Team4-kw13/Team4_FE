import { useRef } from 'react'

import { Icon } from '@/components/Icon/Icon'

import { TOTAL_IMAGE_COUNT } from '../constants/imageCount'
import { useUploadedImages } from '../hooks/useUploadedImages'

import styles from './ImageUploadButton.module.css'

/**
 * 이미지 업로드 버튼 컴포넌트
 *
 * @returns {JSX.Element}
 */

export const ImageUploadButton = () => {
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
