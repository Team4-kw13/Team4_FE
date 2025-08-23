import { Icon } from '@/components/Icon/Icon'

import styles from './OnboardingThird.module.css'

export const OnboardingThird = () => {
  return (
    <>
      <h2 className={styles['subtitle']}>
        부동산 계약서 이해의 시작
        <br />
        한집말이와 함께해요.
      </h2>

      <div className={styles['content']}>
        <Icon name='onboarding3' width={239} />
        <div className={styles['circle']} />
      </div>
    </>
  )
}
