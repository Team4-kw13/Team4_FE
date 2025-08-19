import { useEffect, useRef } from 'react'

export function useInfiniteScroll(onLoadMore, opts = {}) {
  const { root = null, rootMargin = '200px', threshold = 0, enabled = true } = opts

  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting) onLoadMore()
      },
      { root, rootMargin, threshold },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [onLoadMore, root, rootMargin, threshold, enabled])

  return ref
}
