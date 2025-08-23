import icon2 from '@/assets/images/house.svg'
import icon1 from '@/assets/images/note.svg'
import icon4 from '@/assets/images/star.svg'

import styles from './SplashIcon.module.css'

const ICONS = [
  { src: icon1, bottom: '80%', left: '0%' },
  { src: icon2, bottom: '70%', left: '60%' },
  { src: icon4, bottom: '10%', left: '5%' },
]

export function SplashIcon() {
  return (
    <div className={styles.wrapper}>
      {ICONS.map((icon, i) => (
        <div
          key={i}
          className={styles.iconWrapper}
          style={{ bottom: icon.bottom, left: icon.left }}
        >
          <img src={icon.src} alt='' className={styles.icon} />
        </div>
      ))}
    </div>
  )
}
