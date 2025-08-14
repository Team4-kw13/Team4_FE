import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import { TOTAL_IMAGE_COUNT } from '../upload/constants/constants'

/**
 * @typedef {Object} UploadedImageItem
 * @property {string} id 고유 id
 * @property {File} file 원본 파일
 * @property {string} previewUrl 미리보기 URL
 */

/**
 * @typedef {Object} UploadedImagesContextValue
 * @property {UploadedImageItem[]} items 업로드된 이미지들
 * @property {(files: File[]|FileList) => void} addFiles 파일 추가
 * @property {(id: string) => void} removeById id로 삭제
 * @property {() => void} clear 전부 삭제
 */

// eslint-disable-next-line react-refresh/only-export-components
export const UploadedImagesContext = createContext(
  /** @type {UploadedImagesContextValue|null} */ (null),
)

/**
 * 업로드 이미지를 전역으로 제공하는 Provider
 *
 * @param {import('react').PropsWithChildren} props
 * @returns {JSX.Element}
 */
export const UploadedImagesProvider = ({ children }) => {
  const [items, setItems] = useState(/** @type {UploadedImageItem[]} */ ([]))

  useEffect(() => {
    return () => items.forEach((it) => URL.revokeObjectURL(it.previewUrl))
  }, [items])

  const addFiles = useCallback(
    (files) => {
      const array = Array.from(files).map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }))
      const next = [...items, ...array]
      setItems(next.slice(0, TOTAL_IMAGE_COUNT))
    },
    [items],
  )

  const removeById = useCallback(
    (id) => {
      const target = items.find((it) => it.id === id)
      if (target) URL.revokeObjectURL(target.previewUrl)
      setItems((prev) => prev.filter((it) => it.id !== id))
    },
    [items],
  )

  const clear = useCallback(() => {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl))
    setItems([])
  }, [items])

  const value = useMemo(
    () => ({ items, addFiles, removeById, clear }),
    [items, addFiles, removeById, clear],
  )

  return <UploadedImagesContext.Provider value={value}>{children}</UploadedImagesContext.Provider>
}
