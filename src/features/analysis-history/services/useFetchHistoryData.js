import { useEffect, useState } from 'react'

import instance from '@/api/client'
import { useDocumentHistoryActions } from '@/stores/DocumentHistoryStore'
import { stripHighlightMarkers } from '@/utils/highlightMarkers'

export const useFetchHistoryData = (contractId) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const { setHistoryData } = useDocumentHistoryActions()

  useEffect(() => {
    setIsLoading(true)

    const fetchHistoryData = async () => {
      try {
        const { data } = await instance.get(`/api/contracts/detail/${contractId}`)
        setData(data)
        setHistoryData({
          images: data.images,
          vertices: {
            page1: data.highlight['page1'].map((info) => info.vertices),
            page2: data.highlight['page2'].map((info) => info.vertices),
            page3: data.highlight['page3'].map((info) => info.vertices),
          },
          translation: {
            page1: data.highlight['page1'].map((info) => stripHighlightMarkers(info.content)),
            page2: data.highlight['page2'].map((info) => stripHighlightMarkers(info.content)),
            page3: data.highlight['page3'].map((info) => stripHighlightMarkers(info.content)),
          },
          highlight: {
            page1: data.highlight['page1'].map((info) => info.content),
            page2: data.highlight['page2'].map((info) => info.content),
            page3: data.highlight['page3'].map((info) => info.content),
          },
          summary: { summary: data.commonSummary, warning: data.warningSummary },
        })
      } catch (e) {
        console.error(e)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistoryData()
  }, [contractId, setHistoryData])

  return { data, isLoading, isError }
}
