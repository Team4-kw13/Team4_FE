import { useEffect, useMemo, useState } from 'react'

import { parseHighlightSegments } from '@/utils/highlightMarkers'

/**
 * @typedef {{ text: string, highlightLevel: {'w'|'i'|'none'} }} HLSegment
 *
 * @typedef {Object} UseHighlightedSegmentsEditorResult
 * @property {HLSegment[]} segments 파싱된 세그먼트 상태
 * @property {(index: number, nextText: string) => void} updateSegmentText 세그먼트 텍스트 갱신
 * @property {() => string} serializeToMarkedText [[w]]..[[/]] 규칙 직렬화
 */

/**
 * 인라인 마커 문자열을 세그먼트 상태로 관리하고, 다시 마커 문자열로 직렬화하는 훅
 *
 * @param {string} rawMarkedText [[w]]..[[/]] 규칙이 포함된 원본 문자열
 * @returns {UseHighlightedSegmentsEditorResult}
 */

export const useHighlightedSegmentsEditor = (rawMarkedText) => {
  const initialSegments = useMemo(() => {
    const { segments } = parseHighlightSegments(String(rawMarkedText ?? ''))
    return segments
  }, [rawMarkedText])

  const [segments, setSegments] = useState(initialSegments)

  useEffect(() => {
    const { segments: next } = parseHighlightSegments(String(rawMarkedText ?? ''))
    setSegments(next)
  }, [rawMarkedText])

  const updateSegmentText = (index, nextText) => {
    setSegments((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], text: nextText }
      return next
    })
  }

  const serializeToMarkedText = () =>
    segments
      .map((seg) =>
        seg.highlightLevel === 'none' ? seg.text : `[[${seg.highlightLevel}]]${seg.text}[[/]]`,
      )
      .join('')

  return { segments, updateSegmentText, serializeToMarkedText }
}
