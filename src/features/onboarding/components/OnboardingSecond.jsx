import { Icon } from '@/components/Icon/Icon'

import styles from './OnboardingSecond.module.css'

export const OnboardingSecond = () => {
  return (
    <>
      <h2 className={styles['subtitle']}>
        중요한 조항을
        <br />
        한집말이가 설명할게요!
      </h2>

      <div className={styles['content']}>
        <Icon name='onboarding8' width={258} height={208} />
        <div className={styles['circle']} />
      </div>
    </>
  )
}
