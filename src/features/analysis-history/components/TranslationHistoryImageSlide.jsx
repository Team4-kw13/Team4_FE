import { Fragment } from 'react'

import { OcrOverlayBox } from '@/components/contract-image-slide/OcrOverlayBox'
import { TranslationTextEditor } from '@/components/contract-image-slide/TranslationTextEditor'
import { useImageNaturals } from '@/hooks/useImageNaturals'
import { useOcrByPage } from '@/stores/DocumentAnalysisStore'
import {
  useDocumentHistoryImages,
  useDocumentHistoryTranslation,
} from '@/stores/DocumentHistoryStore'
import { toPercentRect } from '@/utils/toPercentRect'

import styles from './TranslationHistoryImageSlide.module.css'

/**
 * @typedef {Object} TranslationHistoryImageSlideProps
 * @property {import('react').RefObject<HTMLDivElement>[]} slideRefs 슬라이드 컨테이너 refs
 */

/**
 * 계약서 번역 이미지 슬라이드
 *
 * - 좌우 스크롤 캐러셀
 * - 이미지 위에 마커 포함 텍스트를 오버레이
 *
 * @param {TranslationHistoryImageSlideProps} props
 * @returns {JSX.Element}
 */

export const ContractAnalysisImageSlideTranslation = ({ slideRefs }) => {
  const { imageRefs, naturalSizes, handleImageLoad } = useImageNaturals()

  const images = useDocumentHistoryImages()
  const ocr = useOcrByPage()
  const translation = useDocumentHistoryTranslation()

  if (!translation) return null

  return (
    <div className={styles['container']}>
      {images.map(({ id, previewUrl }, pageIndex) => {
        const pageKey = `page${pageIndex + 1}`
        const ocrBlocks = ocr[pageKey] ?? []
        const pageTexts = translation[pageKey] ?? []
        const natural = naturalSizes[pageIndex]

        return (
          <Fragment key={id}>
            <div
              ref={slideRefs[pageIndex]}
              data-index={pageIndex + 1}
              className={styles['image-container']}
              style={natural ? { aspectRatio: `${natural.width} / ${natural.height}` } : undefined}
            >
              <img
                ref={(element) => (imageRefs.current[pageIndex] = element)}
                src={previewUrl}
                alt={`계약서 이미지 ${pageIndex + 1}`}
                className={styles['analysis-image']}
                onLoad={() => handleImageLoad(pageIndex)}
              />

              {natural &&
                ocrBlocks.map((ocrBlock, ocrIndex) => {
                  const rect = toPercentRect(ocrBlock, natural.width, natural.height)
                  const text = pageTexts[ocrIndex] ?? ''

                  return (
                    <OcrOverlayBox
                      key={`${ocrBlock.id}-${ocrIndex}`}
                      id={`${ocrBlock.id}-${ocrIndex}`}
                      rect={rect}
                    >
                      <TranslationTextEditor text={text} readOnly />
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
