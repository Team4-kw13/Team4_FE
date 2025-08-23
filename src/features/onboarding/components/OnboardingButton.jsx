import styles from './OnboardingButton.module.css'

export function OnboardingButton({ children, onClick }) {
  return (
    <button type='button' onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}
