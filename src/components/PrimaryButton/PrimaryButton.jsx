import cx from 'classnames'

import styles from './PrimaryButton.module.css'

/**
 * @typedef {Object} PrimaryButtonProps
 * @property {'sm'|'lg'} [size='lg'] 버튼 크기
 * @property {string} label 버튼 안 텍스트(필수)
 * @property {boolean} [disabled=false] 비활성화 상태
 * @property {'button'|'submit'|'reset'} [type='button'] 버튼 타입
 * @property {string} [className] 추가 클래스
 * @property {import('react').ButtonHTMLAttributes<HTMLButtonElement>['aria-label']} [ariaLabel] 접근성 라벨
 * @property {import('react').MouseEventHandler<HTMLButtonElement>} [onClick] 클릭 핸들러
 */

/**
 * 노란색 배경의 버튼 컴포넌트
 *
 * @param {PrimaryButtonProps} props
 */
export function PrimaryButton({
  size = 'lg',
  label,
  disabled = false,
  type = 'button',
  className,
  ariaLabel,
  onClick,
  ...rest
}) {
  const classNames = cx(styles['base'], styles[size], { [styles.disabled]: disabled }, className)

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel ?? label}
      {...rest}
    >
      {label}
    </button>
  )
}
