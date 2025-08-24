import axios from 'axios'

const OCR_INVOKE_URL = import.meta.env.VITE_CLOVA_OCR_INVOKE_URL
const OCR_SECRET = import.meta.env.VITE_CLOVA_OCR

/**
 * OCR 원본 데이터를 앱 내부에서 사용할 수 있는 형태로 변환
 *
 * - 각 OCR 항목에 고유 id를 부여
 * - 추출된 텍스트(inferText)와 좌표 정보(boundingPoly.vertices)를 단순화하여 반환
 *
 * @param {{ inferText: string, boundingPoly: { vertices: { x:number, y:number }[] } }[]} rawOcrData
 *   OCR API에서 내려주는 원본 데이터 배열
 *
 * @returns {{ id: string, text: string, vertices: { x:number, y:number }[] }[]}
 *   변환된 OCR 데이터 배열
 */
export const normalizeOcrData = (rawOcrData) => {
  return rawOcrData.map(({ inferText, boundingPoly }) => ({
    id: crypto.randomUUID(),
    text: inferText,
    vertices: boundingPoly.vertices,
  }))
}

/**
 * OCR API 호출 (비동기)
 *
 * - OCR API 엔드포인트에 POST 요청한 결과 JSON을 그대로 반환
 *
 * @param {FormData} formData API에 전송할 multipart/form-data
 * @returns {Promise<any>} OCR 응답 데이터
 */
export const requestOcr = async (formData) => {
  const res = await axios.post(OCR_INVOKE_URL, formData, {
    headers: { 'X-OCR-SECRET': OCR_SECRET },
  })
  return res.data
}

/**
 * OCR API에 전송할 FormData 빌더
 *
 * @param {File} file 업로드한 이미지 파일
 * @param {string} templateId CLOVA OCR에서 사용할 템플릿 ID
 * @returns {FormData} API 요청용 FormData
 */
export const createOcrFormData = (file, templateId) => {
  const formData = new FormData()

  const message = {
    version: 'V2',
    requestId: crypto.randomUUID(),
    timestamp: Date.now(),
    lang: 'ko',
    images: [
      { format: 'jpg', name: `contract-${templateId}-${Date.now()}`, templateIds: [templateId] },
    ],
  }

  formData.append('message', JSON.stringify(message))
  formData.append('file', file)

  return formData
}
