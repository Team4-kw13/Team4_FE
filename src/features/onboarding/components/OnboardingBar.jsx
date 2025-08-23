import styles from './OnboardingBar.module.css'

export function OnboardingBar({ total = 3, activeIndex = 0, onSelect }) {
  return (
    <div className={styles.bar} role='tablist' aria-label='온보딩 진행도'>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type='button'
          role='tab'
          aria-selected={i === activeIndex}
          className={`${styles.dot} ${i === activeIndex ? styles.active : ''}`}
          onClick={() => onSelect?.(i)}
        />
      ))}
    </div>
  )
}
