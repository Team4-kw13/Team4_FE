import { useCallback, useRef, useState } from 'react'

/**
 * @typedef {{ width:number, height:number } | undefined} NaturalSize
 */

/**
 * 이미지 자연 크기(naturalWidth/Height) 관리 훅
 *
 * @returns {{
 *   imageRefs: import('react').MutableRefObject<(HTMLImageElement|null)[]>,
 *   naturalSizes: NaturalSize[],
 *   handleImageLoad: (index:number)=>void
 * }}
 */
export const useImageNaturals = () => {
  const imageRefs = useRef([])
  const [naturalSizes, setNaturalSizes] = useState([])

  const handleImageLoad = useCallback((index) => {
    const element = imageRefs.current[index]
    if (!element) {
      return
    }

    setNaturalSizes((prev) => {
      const next = [...prev]
      next[index] = { width: element.naturalWidth, height: element.naturalHeight }

      return next
    })
  }, [])

  return { imageRefs, naturalSizes, handleImageLoad }
}
