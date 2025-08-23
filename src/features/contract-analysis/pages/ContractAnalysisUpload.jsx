import { PrimaryButton } from '@/components/primary-button/PrimaryButton'
import { TOTAL_IMAGE_COUNT } from '@/constants/imageCount'
import { useUploadedImages } from '@/hooks/useUploadedImages'

import { ImageUploadButton } from '../components/ImageUploadButton'

import styles from './ContractAnalysisUpload.module.css'

/**
 * @typedef {Object} ContractAnalysisUploadProps
 * @property {() => void} goToNextStep "분석하기" 버튼 클릭 시 다음 단계로 이동하는 콜백
 */

/**
 * 계약서 업로드 화면 컴포넌트
 *
 * - 사용자가 계약서 이미지를 업로드하는 단계
 * - 업로드된 이미지 개수가 `TOTAL_IMAGE_COUNT`(3장)일 때만 "분석하기" 버튼 활성화
 *
 * @param {ContractAnalysisUploadProps} props
 * @returns {JSX.Element}
 */

export const ContractAnalysisUpload = ({ goToNextStep }) => {
  const { items } = useUploadedImages()

  return (
    <>
      <section className={styles['header']}>
        <h2>계악서를 업로드해주세요</h2>
      </section>

      <div className={styles['scroll-section']}>
        <section className={styles['image-button']}>
          <ImageUploadButton />
        </section>

        <p className={styles['hint']}>
          {`PDF, JPG 파일만 올려주세요.\r\n해상도나 화질이 낮으면\r\n한집말이가 내용을 잘 읽기 어려워요.`}
        </p>
      </div>

      <div className={styles['analysis-button']}>
        <PrimaryButton
          size='lg'
          label='분석하기'
          disabled={items.length !== TOTAL_IMAGE_COUNT}
          onClick={goToNextStep}
        />
      </div>
    </>
  )
}
