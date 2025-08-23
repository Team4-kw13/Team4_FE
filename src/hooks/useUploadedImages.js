import { useCallback } from 'react'

import { useUploadedImagesContext } from '@/stores/useUploadedImagesContext'

/**
 * 업로드 이미지 전역 상태를 쓰기 위한 훅
 *
 * @returns {{
 *   items: import('../../stores/UploadedImagesProvider').UploadedImageItem[],
 *   addFiles: (files: File[]|FileList) => void,
 *   removeById: (id: string) => void,
 *   clear: () => void,
 *   handleInputChange: (e: import('react').ChangeEvent<HTMLInputElement>) => void
 * }}
 */

export const useUploadedImages = () => {
  const { items, addFiles, removeById, clear } = useUploadedImagesContext()

  const handleInputChange = useCallback(
    (e) => {
      if (!e.target.files || e.target.files.length === 0) {
        return
      }
      addFiles(e.target.files)
      e.target.value = ''
    },
    [addFiles],
  )

  const addFilesWithLimit = useCallback((files) => addFiles(files), [addFiles])

  return { items, addFiles: addFilesWithLimit, removeById, clear, handleInputChange }
}
