import html2canvas from 'html2canvas'

/**
 * @typedef {Object} UseHtml2CanvasBatchOptions
 * @property {Array<import('react').RefObject<HTMLElement>>} refs 캡처 대상 루트 refs
 * @property {(index:number)=>string} [getFileName] 파일명 생성기 (기본: translated-contract-{n}.png)
 */

/**
 * 여러 DOM 노드를 순차 캡처하여 로컬 저장하는 훅
 *
 * @param {UseHtml2CanvasBatchOptions} options
 */
export function useHtml2CanvasBatch({ refs, getFileName }) {
  const getName = getFileName || ((i) => `번역본 ${i + 1}.png`)

  const mergedOptions = {
    scale: 2,
    useCORS: true,
  }

  const downloadAll = async () => {
    for (let i = 0; i < refs.length; i++) {
      const element = refs[i]?.current
      if (!element) {
        continue
      }

      const canvas = await html2canvas(element, mergedOptions)
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = getName(i)
      a.click()
    }
  }

  return { downloadAll }
}
