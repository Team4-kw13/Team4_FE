/**
 * 주어진 사각형 좌표/크기를 원본 이미지 크기 대비 백분율 좌표로 변환
 *
 * - 두 가지 형태의 입력을 처리:
 *   1) { x, y, width, height } 형태
 *   2) { vertices: [{x, y}, ...] } 형태 (정점 배열)
 * - 반환값은 CSS에서 사용할 수 있는 `%` 단위의 left, top, width, height
 *
 * @param {Object} field - 좌표 데이터
 * @param {number} naturalWidth - 원본 이미지의 너비(px)
 * @param {number} naturalHeight - 원본 이미지의 높이(px)
 * @returns {{top: string, left: string, width: string, height: string}} % 단위의 사각형 영역
 */

export const toPercentRect = (field, naturalWidth, naturalHeight) => {
  let x, y, w, h

  if ('width' in field && 'height' in field) {
    x = field.x
    y = field.y
    w = field.width
    h = field.height
  } else if (Array.isArray(field.vertices)) {
    const xs = field.vertices.map((v) => v.x)
    const ys = field.vertices.map((v) => v.y)
    const minX = Math.min(...xs)
    const minY = Math.min(...ys)
    const maxX = Math.max(...xs)
    const maxY = Math.max(...ys)
    x = minX
    y = minY
    w = maxX - minX
    h = maxY - minY
  } else {
    return { top: 0, left: 0, width: 0, height: 0 }
  }

  return {
    left: (x / naturalWidth) * 100 + '%',
    top: (y / naturalHeight) * 100 + '%',
    width: (w / naturalWidth) * 100 + '%',
    height: (h / naturalHeight) * 100 + '%',
  }
}
