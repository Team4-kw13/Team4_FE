import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton'

import { ImageUploadButton } from '../components/ImageUploadButton'
import {
  OCR_DUMMY_DATA_PAGE1,
  OCR_DUMMY_DATA_PAGE2,
  OCR_DUMMY_DATA_PAGE3,
  SUMMARY_DUMMY_DATA,
  TRANSLATION_DUMMY_DATA_PAGE1,
  TRANSLATION_DUMMY_DATA_PAGE2,
  TRANSLATION_DUMMY_DATA_PAGE3,
} from '../constants/dummy'
import { TOTAL_IMAGE_COUNT } from '../constants/imageCount'
import { useUploadedImages } from '../hooks/useUploadedImages'
import { useDocumentAnalysisContext } from '../stores/useDocumentAnalysisContext'

import styles from './ContractAnalysisUpload.module.css'

/**
 * @typedef {Object} ContractAnalysisMainProps
 * @property {() => void} goToNextStep "분석하기" 버튼 클릭 시 실행할 콜백 함수
 */

/**
 * 계약서 업로드 화면 컴포넌트
 *
 * @param {ContractAnalysisMainProps} props
 * @returns {JSX.Element}
 */

export const ContractAnalysisUpload = ({ goToNextStep }) => {
  const { items } = useUploadedImages()
  const { updateOCR, updateTranslation, updateSummary } = useDocumentAnalysisContext()

  const handleAnalysis = () => {
    updateOCR('page1', OCR_DUMMY_DATA_PAGE1)
    updateOCR('page2', OCR_DUMMY_DATA_PAGE2)
    updateOCR('page3', OCR_DUMMY_DATA_PAGE3)
    updateTranslation('page1', TRANSLATION_DUMMY_DATA_PAGE1)
    updateTranslation('page2', TRANSLATION_DUMMY_DATA_PAGE2)
    updateTranslation('page3', TRANSLATION_DUMMY_DATA_PAGE3)
    updateSummary(SUMMARY_DUMMY_DATA)
    goToNextStep()
  }

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
          onClick={handleAnalysis}
        />
      </div>
    </>
  )
}
