import cx from 'classnames'

import { Icon } from '@/components/Icon/Icon'

import styles from './ScrollToTopButton.module.css'

/**
 * @typedef {Object} ScrollToTopButtonProps
 * @property {React.RefObject<HTMLElement>} targetRef 스크롤을 올릴 스크롤 컨테이너 ref
 * @property {string} [className] 추가 클래스명
 */

/**
 * 지정된 스크롤 컨테이너의 맨 위로 부드럽게 스크롤하는 버튼
 *
 * @param {ScrollToTopButtonProps} props
 * @returns {JSX.Element}
 */

export const ScrollToTopButton = ({ targetRef, className = '' }) => {
  const handleClick = () => {
    const root = targetRef?.current

    if (root) {
      root.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      type='button'
      className={cx(styles['button'], { className })}
      onClick={handleClick}
      aria-label='맨 위로 이동'
    >
      <Icon name='caret' width={24} height={24} />
    </button>
  )
}
