import { useNavigate } from 'react-router-dom'

import { Icon } from '../Icon/Icon'

import styles from './BackButton.module.css'

/**
 * @typedef {Object} BackButtonProps
 * @property {string} [to] 이동할 경로. 없으면 이전 페이지로 이동
 */

/**
 * 뒤로가기 버튼 (to 지정 시 해당 경로로 이동, 없을 경우 이전 페이지 이동)
 */

export function BackButton({ to }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(to || -1)
  }

  return (
    <button type='button' onClick={handleClick} className={styles['button']} aria-label='뒤로가기'>
      <Icon name='caret' width={32} height={32} />
    </button>
  )
}
