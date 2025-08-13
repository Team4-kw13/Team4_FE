import { useNavigate } from 'react-router-dom'

import { Icon } from '../Icon/Icon'

import styles from './BackButton.module.css'

/**
 * @typedef {Object} BackButtonProps
 * @property {string} [to] 이동할 경로. 없으면 이전 페이지로 이동
 * @property {() => void} [onClick] 클릭 시 실행할 함수 (지정 시 기본 이동 동작 대신 실행)
 */

/**
 * 뒤로가기 버튼 (to 지정 시 해당 경로로 이동, 없을 경우 이전 페이지 이동)
 * - onClick이 지정되면 해당 함수만 실행
 */
export function BackButton({ to, onClick }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    navigate(to || -1)
  }

  return (
    <button type='button' onClick={handleClick} className={styles.button} aria-label='뒤로가기'>
      <Icon name='caret' width={32} height={32} />
    </button>
  )
}
