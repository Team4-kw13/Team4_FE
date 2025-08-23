import instance from '@/api/client'
import { useUploadedImages } from '@/hooks/useUploadedImages'

export const useSaveAnalysisImage = () => {
  const { items } = useUploadedImages()

  const saveAnalysisImage = async (contractId) => {
    if (!items?.length) throw new Error('업로드된 이미지가 없습니다.')

    const sendForm = new FormData()

    items.forEach(({ file }, idx) => {
      if (!(file instanceof File || file instanceof Blob)) {
        throw new Error(`파일 형식이 올바르지 않습니다. index=${idx}`)
      }
      sendForm.append('image', file, file.name || `image-${idx + 1}.jpg`)
    })

    const response = await instance.post(`/api/contracts/image/${contractId}`, sendForm)

    return response.data
  }

  return { saveAnalysisImage }
}
