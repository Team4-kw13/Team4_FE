import { Icon } from '@/components/Icon/Icon'

import styles from './Splash.module.css'

export function Splash() {
  return (
    <section className={styles.container}>
      <h1 className={styles.brand}>한집말이</h1>
      <p className={styles.title}>
        당신의 집,
        <br />
        <span className={styles.em}>당신</span>의 말로
      </p>

      <div className={styles['icon-container']}>
        <Icon name='note' width={251} height={260} className={styles['icon']} />
        <Icon name='house' width={366} height={366} className={styles['icon']} />
        <Icon name='star' width={246} className={styles['icon']} />
      </div>
      <div className={styles['circle']} />
    </section>
  )
}

export default Splash
