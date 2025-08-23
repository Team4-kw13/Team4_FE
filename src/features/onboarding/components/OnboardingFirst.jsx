import cx from 'classnames'

import { Icon } from '@/components/Icon/Icon'

import styles from './OnboardingFirst.module.css'

export const OnboardingFirst = () => {
  return (
    <>
      <h2 className={styles['subtitle']}>
        복잡한 부동산 계약서,
        <br />
        이해하기 어렵나요?
      </h2>

      <div className={styles['content']}>
        <div className={styles['icon-container']}>
          <div className={cx(styles['blur-box'], styles['blur-box-left'])} />

          <Icon name='calendar' width={122.5} height={122.5} className={styles['blur']} />
          <Icon name='folder' width={122.65} height={122.35} />
          <Icon name='house' width={122.5} height={122.5} className={styles['blur']} />
          <Icon name='close-image' width={122.65} height={122.35} className={styles['blur']} />
          <Icon name='note' width={118.35} height={122.5} />
          <Icon name='chat' width={122.65} height={122.35} className={styles['blur']} />

          <div className={cx(styles['blur-box'], styles['blur-box-right'])} />
        </div>
        <div className={styles['circle']} />
      </div>
    </>
  )
}
