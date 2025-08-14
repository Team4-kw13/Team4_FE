import { useUploadedImages } from '../hooks/useUploadedImages'

import styles from './ContractAnalysisImageSlide.module.css'

/**
 * @typedef {Object} ContractAnalysisImageSlideProps
 * @property {import('react').RefObject<HTMLDivElement>[]} slideRefs
 *   각 슬라이드 컨테이너 DOM을 참조하는 ref 배열
 */

/**
 * 계약서 번역 이미지 슬라이드 컴포넌트
 *
 * @param {ContractAnalysisImageSlideProps} props
 * @returns {JSX.Element}
 */

export const ContractAnalysisImageSlide = ({ slideRefs }) => {
  const { items } = useUploadedImages()

  return (
    <div className={styles['container']}>
      {items.map(({ id, previewUrl }, index) => (
        <div
          key={id}
          ref={slideRefs[index]}
          data-index={index + 1}
          className={styles['image-container']}
        >
          <img
            src={previewUrl}
            alt={`계약서 이미지${index}`}
            className={styles['analysis-image']}
          />
        </div>
      ))}
    </div>
  )
}
