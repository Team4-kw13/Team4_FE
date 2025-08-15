import { useEffect, useState } from 'react'
import cx from 'classnames'

import styles from './TranslationTextEditor.module.css'
/**
 * @typedef {Object} TranslationTextEditorProps
 * @property {string} text 번역 플레인 텍스트(마커가 섞여 들어와도 내부에서 제거)
 * @property {(nextText: string) => void} [onChange] blur 시 직렬화(플레인) 콜백
 * @property {boolean} [readOnly=false] 읽기 전용 여부
 * @property {string} [className] 추가 클래스명
 * @property {import('react').HTMLAttributes<HTMLSpanElement>} [rest] span에 전달할 DOM 속성
 */

export const TranslationTextEditor = ({ text, onChange, readOnly = false, ...rest }) => {
  const [value, setValue] = useState(text)

  useEffect(() => {
    setValue(text)
  }, [text])

  const handleInput = (e) => {
    if (readOnly) return
    setValue(e.currentTarget.textContent ?? '')
  }

  const handleBlur = () => {
    if (!onChange || readOnly) return
    onChange(value)
  }

  return (
    <span
      className={cx(styles['container'], { [styles['readonly']]: readOnly })}
      contentEditable={!readOnly}
      suppressContentEditableWarning
      role='textbox'
      aria-readonly={readOnly}
      onInput={handleInput}
      onBlur={handleBlur}
      {...rest}
    >
      {value}
    </span>
  )
}
