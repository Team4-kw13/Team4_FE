/**
 * 하이라이트 마커 유틸 (개정)
 *
 * - 마커 표기:
 *   중요:   [[w]] ... [[/w]]
 *   보통:   [[i]] ... [[/i]]
 * - stripHighlightMarkers: 마커 제거(표시용 -> 실데이터 변환)
 * - parseHighlightSegments: 렌더링 세그먼트 파싱(level 포함)
 * - applyMarker / removeMarkersInRange: 편집기용 마커 삽입·제거
 */

/** 마커 토큰 정규식 */
const OPEN_RE = /\[\[(w|i)\]\]/g
const CLOSE_RE = /\[\[\/(w|i)\]\]/g
const LEGACY_CLOSE_RE = /\[\[\/\]\]/g
const ANY_TOKEN_RE = /(\[\[(w|i)\]\]|\[\[\/(w|i)\]\]|\[\[\/\]\])/g

/**
 * 마커 제거: 표시용 텍스트 -> 마커 없는 순수 텍스트
 * @param {string} text
 * @returns {string}
 */
export const stripHighlightMarkers = (text) => {
  return String(text).replace(OPEN_RE, '').replace(CLOSE_RE, '').replace(LEGACY_CLOSE_RE, '')
}

/**
 * 렌더링용 세그먼트로 파싱
 * - 마커 없는 구간: highlightLevel: 'none'
 * - 마커 구간: 'w' | 'i'
 * @param {string} textWithMarkers
 * @returns {{ segments: Array<{ text: string, highlightLevel: 'none'|'w'|'i' }> }}
 */
export const parseHighlightSegments = (textWithMarkers) => {
  const segments = []
  const tokenRegex = new RegExp(ANY_TOKEN_RE, 'g')
  let lastIndex = 0

  /** @type {'none'|'w'|'i'} */
  let currentHighlightLevel = 'none'
  let match

  while ((match = tokenRegex.exec(textWithMarkers)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: textWithMarkers.slice(lastIndex, match.index),
        highlightLevel: currentHighlightLevel,
      })
    }

    const token = match[0]
    const openLevel = match[2]
    const closeLevel = match[3]

    if (openLevel === 'w' || openLevel === 'i') {
      currentHighlightLevel = openLevel
    } else if (closeLevel === 'w' || closeLevel === 'i' || token === '[[/]]') {
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
 * @param {string} text
 * @param {number} start
 * @param {number} end
 * @param {'w'|'i'} level
 * @returns {string}
 */
export const applyMarker = (text, start, end, level) => {
  if (start < 0 || end < start || end > text.length) return text
  const open = `[[${level}]]`
  const close = `[[/${level}]]`
  return text.slice(0, start) + open + text.slice(start, end) + close + text.slice(end)
}

/**
 * 주어진 범위 내의 마커 토큰을 제거
 * - 범위에 걸친 토큰은 토큰만 제거 (내용은 남김)
 * @param {string} text
 * @param {number} start
 * @param {number} end
 * @returns {string}
 */
export const removeMarkersInRange = (text, start, end) => {
  if (start < 0 || end < start || end > text.length) return text
  const head = text.slice(0, start)
  const mid = text
    .slice(start, end)
    .replace(OPEN_RE, '')
    .replace(CLOSE_RE, '')
    .replace(LEGACY_CLOSE_RE, '')
  const tail = text.slice(end)
  return head + mid + tail
}
