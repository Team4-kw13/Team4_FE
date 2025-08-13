import { useState } from 'react'

import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton'

import { ImageUploadButton } from '../components/ImageUploadButton'
import { TOTAL_IMAGE_COUNT } from '../constants/constants'

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
  const [files, setFiles] = useState([])

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files)
    const updatedFiles = [...files, ...selectedFiles].slice(0, TOTAL_IMAGE_COUNT)
    setFiles(updatedFiles)
  }

  return (
    <>
      <section className={styles['header']}>
        <h2>계악서를 업로드해주세요</h2>
      </section>

      <div className={styles['scroll-section']}>
        <section className={styles['image-button']}>
          <ImageUploadButton onChange={handleFileChange} currentFileCount={files.length} />
        </section>

        <p className={styles['hint']}>
          {`PDF, JPG 파일만 올려주세요.\r\n해상도나 화질이 낮으면\r\n한집말이가 내용을 잘 읽기 어려워요.`}
        </p>
      </div>

      <div className={styles['analysis-button']}>
        <PrimaryButton
          size='lg'
          label='분석하기'
          disabled={files.length !== TOTAL_IMAGE_COUNT}
          onClick={goToNextStep}
        />
      </div>
    </>
  )
}
