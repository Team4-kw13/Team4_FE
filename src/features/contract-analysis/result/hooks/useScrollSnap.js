import { useEffect } from 'react'

export const useScrollSnap = (carouselRef, setStep, fieldName) => {
  useEffect(() => {
    const options = {
      root: carouselRef.current,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepIndex = entry.target.dataset.index
          setStep(Number(stepIndex))
        }
      })
    }, options)

    if (carouselRef.current) {
      const snapItems = carouselRef.current.querySelectorAll(fieldName)
      snapItems.forEach((item) => {
        observer.observe(item)
      })
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [carouselRef, fieldName, setStep])
}
