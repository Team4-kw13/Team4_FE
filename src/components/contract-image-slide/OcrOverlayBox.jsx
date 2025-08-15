import cx from 'classnames'

import styles from './OcrOverlayBox.module.css'

/**
 * @typedef {Object} OcrOverlayBoxProps
 * @property {string} id 고유 id (액티브 판별용)
 * @property {{ left:string, top:string, width:string, height:string }} rect 퍼센트 단위 포지션
 * @property {boolean} active 활성화 여부
 * @property {() => void} onActivate 클릭 시 활성화 콜백
 * @property {import('react').ReactNode} children 내부에 렌더링할 컨텐츠(텍스트 등)
 */

/**
 * 이미지 위 위치/크기만 책임지는 오버레이 박스
 *
 * - 포커스/활성화 시 z-index 제어
 * - 탭 포커스 가능하게 접근성 고려 (role/aria)
 *
 * @param {OcrOverlayBoxProps} props
 * @returns {JSX.Element}
 */

export const OcrOverlayBox = ({ id, rect, active, onActivate, children }) => {
  return (
    <div
      className={cx(styles['overlay'], { [styles['active']]: active })}
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        zIndex: active ? 2 : 1,
      }}
      role='button'
      tabIndex={0}
      aria-pressed={active}
      aria-label={`번역 텍스트 박스 ${id}`}
      onClick={onActivate}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onActivate()}
    >
      {children}
    </div>
  )
}
