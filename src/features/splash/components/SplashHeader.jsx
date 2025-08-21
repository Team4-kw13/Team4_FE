import styles from './SplashHeader.module.css'

export function SplashHeader() {
  return (
    <header className={styles.container}>
      <p className={styles.brand}>한집말이</p>
      <h1 className={styles.title}>
        당신의 집,
        <br />
        <span className={styles.em}>당신</span>의 말로
      </h1>
    </header>
  )
}
