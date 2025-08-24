import { Icon } from '@/components/Icon/Icon'

import styles from './Splash.module.css'

export function Splash() {
  return (
    <div className={styles['container']}>
      <div className={styles['circle']} />

      <section className={styles['content']}>
        <header className={styles['header']}>
          <h1 className={styles.brand}>한집말이</h1>
          <p className={styles.title}>
            당신의 집,
            <br />
            <span className={styles.em}>당신</span>의 말로
          </p>
        </header>

        <div className={styles['icon-container']}>
          <Icon name='note' width={255} height={265} className={styles['icon']} />
          <Icon name='house' width={366} height={366} className={styles['icon']} />
          <Icon name='star' width={246} className={styles['icon']} />
        </div>
      </section>
    </div>
  )
}

export default Splash
