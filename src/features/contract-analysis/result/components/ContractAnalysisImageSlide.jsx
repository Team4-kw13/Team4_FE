import testImg1 from '@/assets/test/test1.png'
import testImg2 from '@/assets/test/test2.png'
import testImg3 from '@/assets/test/test3.png'

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
  const images = [testImg1, testImg2, testImg3]

  return (
    <div className={styles['container']}>
      {images.map((image, index) => (
        <div
          key={index}
          ref={slideRefs[index]}
          data-index={index + 1}
          className={styles['image-container']}
        >
          <img src={image} alt={`계약서 이미지${index}`} className={styles['analysis-image']} />
        </div>
      ))}
    </div>
  )
}
