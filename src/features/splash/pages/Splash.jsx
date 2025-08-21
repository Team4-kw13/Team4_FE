import { SplashHeader } from '../components/SplashHeader'
import { SplashIcon } from '../components/SplashIcon'

import styles from './Splash.module.css'

export function Splash() {
  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <SplashHeader />
        <SplashIcon />
      </div>
    </section>
  )
}

export default Splash
