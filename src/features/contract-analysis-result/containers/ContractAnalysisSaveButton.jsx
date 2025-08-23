import { useNavigate } from 'react-router-dom'

import { PrimaryButton } from '@/components/primary-button/PrimaryButton'
import { ROUTES } from '@/router/routes.constant'

import { useSaveAnalysisData } from '../services/useSaveAnalysisData'
import { useSaveAnalysisImage } from '../services/useSaveAnalysisImage'

import styles from './ContractAnalysisSaveButton.module.css'

export const ContractAnalysisSaveButton = () => {
  const navigate = useNavigate()
  const { saveAnalysisData } = useSaveAnalysisData()
  const { saveAnalysisImage } = useSaveAnalysisImage()

  const handleSave = async () => {
    try {
      const { contractId } = await saveAnalysisData()
      await saveAnalysisImage(contractId)
      navigate(ROUTES.ANALYSIS_HISTORY(contractId))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <PrimaryButton
      size='lg'
      label='저장하기'
      className={styles['save-button']}
      onClick={handleSave}
    />
  )
}
