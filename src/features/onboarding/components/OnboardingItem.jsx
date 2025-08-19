import styles from './OnboardingItem.module.css'

export function OnboardingItem({ lines, image, images, alt, halo }) {
  const hasCluster = Array.isArray(images) && images.length > 0

  return (
    <div className={styles.wrap}>
      <div className={styles.textBox} role='heading' aria-level={1}>
        {lines.map((line, i) => (
          <p className={styles.title} key={i}>
            {line}
          </p>
        ))}
      </div>

      <div className={styles.figure}>
        {halo && <div className={`${styles.haloBase} ${styles[halo]}`} aria-hidden='true' />}

        {hasCluster ? (
          <div className={styles.cluster} role='group' aria-label={alt || '이미지 묶음'}>
            {images.map((src, i) => (
              <img
                key={i}
                className={styles.clusterItem}
                src={src}
                alt={alt || `아이콘 ${i + 1}`}
              />
            ))}
          </div>
        ) : (
          <img className={styles.image} src={image} alt={alt} />
        )}
      </div>
    </div>
  )
}
