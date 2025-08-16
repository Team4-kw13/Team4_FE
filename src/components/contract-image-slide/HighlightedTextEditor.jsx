import { useRef } from 'react'
import cx from 'classnames'

import { useHighlightedSegmentsEditor } from '@/hooks/useHighlightedSegmentsEditor'

import styles from './HighlightedTextEditor.module.css'

/**
 * @typedef {'w'|'i'|'none'} HighlightLevel
 * @typedef {{ text: string, highlightLevel: HighlightLevel }} HLSegment
 *
 * @typedef {Object} HighlightedTextEditorProps
 * @property {string} text [[w]]..[[/]] 마커 포함 원본 문자열
 * @property {(nextMarkedText: string) => void} [onChange] 블러 시 직렬화된 문자열 콜백
 * @property {boolean} [readOnly=false] 읽기 전용 여부
 * @property {import('react').HTMLAttributes<HTMLSpanElement>} [rest] span에 전달할 DOM 속성
 */

/**
 * 인라인 마커 하이라이트 편집 컴포넌트
 *
 * @param {HighlightedTextEditorProps} props
 * @returns {JSX.Element}
 */

export const HighlightedTextEditor = ({ text, onChange, readOnly = false, ...rest }) => {
  const containerRef = useRef(null)
  const { segments, updateSegmentText, serializeToMarkedText } = useHighlightedSegmentsEditor(text)

  const handleBlur = () => {
    if (!onChange) return
    onChange(serializeToMarkedText())
  }

  const backgroundClass = (level) => {
    if (level === 'w') return styles['bg-warn']
    if (level === 'i') return styles['bg-important']
    return ''
  }

  return (
    <span ref={containerRef} className={styles['container']} onBlur={handleBlur} {...rest}>
      {segments.map(({ text, highlightLevel }, index) => (
        <span
          key={index}
          className={cx(styles['segment'], backgroundClass(highlightLevel), {
            [styles['readonly']]: readOnly,
          })}
          contentEditable={!readOnly}
          suppressContentEditableWarning
          role='textbox'
          data-highlight-level={highlightLevel}
          onInput={(e) => updateSegmentText(index, e.currentTarget.textContent ?? '')}
        >
          {text}
        </span>
      ))}
    </span>
  )
}
