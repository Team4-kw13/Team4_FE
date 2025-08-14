import { useContext } from 'react'

import { UploadedImagesContext } from './UploadedImagesProvider'

/**
 * 내부 전용: Context 안전 접근자
 * @returns {import('./UploadedImagesProvider').UploadedImagesContextValue}
 */

export const useUploadedImagesContextUnsafe = () => {
  const context = useContext(UploadedImagesContext)
  if (!context) {
    throw new Error('useUploadedImages는 UploadedImagesProvider 내부에서만 사용 가능합니다.')
  }
  return context
}
