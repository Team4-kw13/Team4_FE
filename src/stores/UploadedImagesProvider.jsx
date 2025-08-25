import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import { TOTAL_IMAGE_COUNT } from '../constants/imageCount'

/**
 * @typedef {Object} UploadedImageItem
 * @property {string} id
 * @property {File} file           // ❗️File 필수
 * @property {string} previewUrl   // object URL (blob:...)
 */

/**
 * @typedef {Object} UploadedImagesContextValue
 * @property {UploadedImageItem[]} items
 * @property {(files: File[]|FileList) => void} addFiles
 * @property {(id: string) => void} removeById
 * @property {() => void} clear
 */

// eslint-disable-next-line react-refresh/only-export-components
export const UploadedImagesContext = createContext(
  /** @type {UploadedImagesContextValue|null} */ (null),
)

const DEFAULT_SOURCES = [
  '/templates/contract1.jpg',
  '/templates/contract2.jpg',
  '/templates/contract3.jpg',
]

export const UploadedImagesProvider = ({ children }) => {
  const [items, setItems] = useState(/** @type {UploadedImageItem[]} */ ([]))

  // 기본 3장을 File로 선로딩
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const loaded = await Promise.all(
          DEFAULT_SOURCES.map(async (src, i) => {
            const res = await fetch(src)
            if (!res.ok) throw new Error(`Failed to load ${src}`)
            const blob = await res.blob()
            const filename = src.split('/').pop() || `preset-${i + 1}.jpg`
            const file = new File([blob], filename, { type: blob.type || 'image/jpeg' })
            const previewUrl = URL.createObjectURL(file)
            return {
              id: `preset-${i + 1}`,
              file,
              previewUrl,
            }
          }),
        )
        if (!cancelled) {
          setItems((prev) => {
            // 정해진 총량을 넘지 않게
            const next = [...loaded, ...prev].slice(0, TOTAL_IMAGE_COUNT)
            return next
          })
        }
      } catch (e) {
        console.error(e)
      }
    })()
    // 언마운트 시 생성한 object URL 정리
    return () => {
      cancelled = true
      setItems((prev) => {
        prev.forEach((it) => {
          if (it.previewUrl.startsWith('blob:')) URL.revokeObjectURL(it.previewUrl)
        })
        return []
      })
    }
  }, [])

  const addFiles = useCallback((files) => {
    const array = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }))
    setItems((prev) => [...prev, ...array].slice(0, TOTAL_IMAGE_COUNT))
  }, [])

  const removeById = useCallback((id) => {
    setItems((prev) => {
      const target = prev.find((it) => it.id === id)
      if (target && target.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(target.previewUrl)
      }
      return prev.filter((it) => it.id !== id)
    })
  }, [])

  const clear = useCallback(() => {
    setItems((prev) => {
      prev.forEach((it) => {
        if (it.previewUrl.startsWith('blob:')) URL.revokeObjectURL(it.previewUrl)
      })
      return []
    })
  }, [])

  const value = useMemo(
    () => ({ items, addFiles, removeById, clear }),
    [items, addFiles, removeById, clear],
  )

  return <UploadedImagesContext.Provider value={value}>{children}</UploadedImagesContext.Provider>
}
