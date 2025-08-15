/**
 * 하이라이트 마커 유틸
 *
 * - 마커 표기: [[w]]...[[/]] (중요), [[i]]...[[/]] (보통)
 * - stripHighlightMarkers: 마커 제거(표시용 -> 실데이터 변환)
 * - parseHighlightSegments: 렌더링에 쓸 세그먼트 파싱(level 포함)
 * - applyMarker / removeMarkersInRange: 편집기용 마커 삽입·제거
 */

/** 마커 토큰 정규식 */
const OPEN_RE = /\[\[(w|i)\]\]/g // [[w]] or [[i]]
const CLOSE_RE = /\[\[\/\]\]/g // [[/]]
const ANY_TOKEN_RE = /(\[\[(w|i)\]\]|\[\[\/\]\])/g

/**
 * 마커 제거: 표시용 텍스트 -> 마커 없는 순수 텍스트
 *
 * @param {string} text 마커 포함 텍스트
 * @returns {string} 마커 제거된 텍스트
 */
export const stripHighlightMarkers = (text) => {
  return String(text).replace(OPEN_RE, '').replace(CLOSE_RE, '')
}

/**
 * 렌더링용 세그먼트로 파싱
 *
 * - 마커 없는 구간은 highlightLevel: 'none'
 * - 마커 구간은 highlightLevel: 'w' | 'i'
 *
 * @param {string} textWithMarkers 마커 포함 텍스트
 * @returns {{ segments: Array<{ text: string, highlightLevel: 'none'|'w'|'i' }> }}
 */
export const parseHighlightSegments = (textWithMarkers) => {
  const segments = []
  const tokenRegex = new RegExp(ANY_TOKEN_RE, 'g')
  let lastIndex = 0

  /** @type {'none'|'w'|'i'} */
  let currentHighlightLevel = 'none'
  let matchResult

  while ((matchResult = tokenRegex.exec(textWithMarkers)) !== null) {
    if (matchResult.index > lastIndex) {
      segments.push({
        text: textWithMarkers.slice(lastIndex, matchResult.index),
        highlightLevel: currentHighlightLevel,
      })
    }

    const matchedToken = matchResult[0]
    const tokenHighlightLevel = matchResult[2] // 'w' | 'i'

    if (tokenHighlightLevel === 'w' || tokenHighlightLevel === 'i') {
      currentHighlightLevel = tokenHighlightLevel
    } else if (matchedToken === '[[/]]') {
      currentHighlightLevel = 'none'
    }
    lastIndex = tokenRegex.lastIndex
  }

  if (lastIndex < textWithMarkers.length) {
    segments.push({
      text: textWithMarkers.slice(lastIndex),
      highlightLevel: currentHighlightLevel,
    })
  }

  return { segments }
}

/**
 * 문자열 특정 범위를 마커로 감쌈
 *
 * @param {string} text 원본 텍스트
 * @param {number} start 0 이상
 * @param {number} end start 이상
 * @param {'w'|'i'} level 'w' | 'i'
 * @returns {string} 마커 삽입된 텍스트
 */
export const applyMarker = (text, start, end, level) => {
  if (start < 0 || end < start || end > text.length) {
    return text
  }

  const open = `[[${level}]]`
  const close = '[[/]]'
  return text.slice(0, start) + open + text.slice(start, end) + close + text.slice(end)
}

/**
 * 주어진 범위 내의 마커 토큰을 제거
 * - 범위에 걸친 토큰은 토큰만 제거 (내용은 남김)
 *
 * @param {string} text 마커 포함 텍스트
 * @param {number} start
 * @param {number} end
 * @returns {string}
 */
export const removeMarkersInRange = (text, start, end) => {
  if (start < 0 || end < start || end > text.length) {
    return text
  }

  const head = text.slice(0, start)
  const mid = text.slice(start, end).replace(OPEN_RE, '').replace(CLOSE_RE, '')
  const tail = text.slice(end)
  return head + mid + tail
}
