import { Fragment, useState } from 'react'

import { useImageNaturals } from '@/hooks/useImageNaturals'
import { useDocumentAnalysisContext } from '@/stores/useDocumentAnalysisContext'
import { toPercentRect } from '@/utils/toPercentRect'

import { HighlightedTextEditor } from './HighlightedTextEditor'
import { OcrOverlayBox } from './OcrOverlayBox'

import styles from './ContractAnalysisImageSlide.module.css'

/**
 * @typedef {Object} ContractAnalysisImageSlideProps
 * @property {{ id:string, previewUrl:string }[]} images 업로드된 이미지 목록
 * @property {import('react').RefObject<HTMLDivElement>[]} slideRefs 슬라이드 컨테이너 refs
 * @property {boolean} [readOnly=false] 읽기 전용 여부
 */

/**
 * 계약서 번역 이미지 슬라이드 (하이라이트 모드)
 *
 * - 좌우 스크롤 캐러셀
 * - 이미지 위에 마커 포함 텍스트를 오버레이
 * - 편집 시 updateHighlightedTextAndSync로 하이라이트/순수 번역 동기화
 *
 * @param {ContractAnalysisImageSlideProps} props
 * @returns {JSX.Element}
 */

export const ContractAnalysisImageSlideHighlight = ({ images, slideRefs, readOnly = false }) => {
  const [activeFieldId, setActiveFieldId] = useState(null)
  const { imageRefs, naturalSizes, handleImageLoad } = useImageNaturals()

  const {
    state: { ocrByPage, highlightedTextByPage },
    actions: { updateHighlightedTextAndSync },
  } = useDocumentAnalysisContext()

  return (
    <div className={styles['container']}>
      {images.map(({ id, previewUrl }, pageIndex) => {
        const pageKey = `page${pageIndex + 1}`
        const ocrBlocks = ocrByPage[pageKey] ?? []
        const pageTexts = highlightedTextByPage[pageKey] ?? []
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
                      active={activeFieldId === ocrBlock.id}
                      onActivate={() => setActiveFieldId(ocrBlock.id)}
                    >
                      <HighlightedTextEditor
                        text={text}
                        readOnly={readOnly}
                        onChange={(nextMarkedText) =>
                          updateHighlightedTextAndSync(pageKey, ocrIndex, nextMarkedText)
                        }
                      />
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
