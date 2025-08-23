import { Fragment } from 'react'

import { HighlightedTextEditor } from '@/components/contract-image-slide/HighlightedTextEditor'
import { OcrOverlayBox } from '@/components/contract-image-slide/OcrOverlayBox'
import { useImageNaturals } from '@/hooks/useImageNaturals'
import {
  useDocumentHistoryHighlight,
  useDocumentHistoryImages,
  useDocumentHistoryVertices,
} from '@/stores/DocumentHistoryStore'
import { toPercentRect } from '@/utils/toPercentRect'

import styles from './HighlightHistoryImageSlide.module.css'

/**
 * @typedef {Object} HighlightHistoryImageSlideProps
 * @property {import('react').RefObject<HTMLDivElement>[]} slideRefs 슬라이드 컨테이너 refs
 */

/**
 * 계약서 번역 이미지 슬라이드 (하이라이트 모드)
 *
 * - 좌우 스크롤 캐러셀
 * - 이미지 위에 마커 포함 텍스트를 오버레이
 *
 * @param {HighlightHistoryImageSlideProps} props
 * @returns {JSX.Element}
 */

export const HighlightHistoryImageSlide = ({ slideRefs }) => {
  const { imageRefs, naturalSizes, handleImageLoad } = useImageNaturals()

  const images = useDocumentHistoryImages()
  const vertices = useDocumentHistoryVertices()
  const highlight = useDocumentHistoryHighlight()

  if (!highlight) return null

  return (
    <div className={styles['container']}>
      {images.map((image, pageIndex) => {
        const pageKey = `page${pageIndex + 1}`
        const currentVertices = vertices[pageKey] ?? []
        const pageTexts = highlight[pageKey] ?? []
        const natural = naturalSizes[pageIndex]

        return (
          <Fragment key={image}>
            <div
              ref={slideRefs[pageIndex]}
              data-index={pageIndex + 1}
              className={styles['image-container']}
              style={natural ? { aspectRatio: `${natural.width} / ${natural.height}` } : undefined}
            >
              <img
                crossOrigin='anonymous'
                ref={(element) => (imageRefs.current[pageIndex] = element)}
                src={image}
                alt={`계약서 이미지 ${pageIndex + 1}`}
                className={styles['analysis-image']}
                onLoad={() => handleImageLoad(pageIndex)}
              />

              {natural &&
                currentVertices.map((ocrBlock, ocrIndex) => {
                  const rect = toPercentRect({ vertices: ocrBlock }, natural.width, natural.height)
                  const text = pageTexts[ocrIndex] ?? ''

                  return (
                    <OcrOverlayBox
                      key={`${image}-${ocrIndex}`}
                      id={`${image}-${ocrIndex}`}
                      rect={rect}
                    >
                      <HighlightedTextEditor text={text} readOnly />
                    </OcrOverlayBox>
                  )
                })}
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
