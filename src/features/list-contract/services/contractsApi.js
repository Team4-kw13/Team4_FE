export async function fetchContracts({ cursor = 0, limit = 10 } = {}) {
  const TOTAL = 57

  const start = cursor
  const end = Math.min(cursor + limit, TOTAL)

  const items = Array.from({ length: end - start }, (_, i) => {
    const id = start + i + 1
    return {
      id,
      title: '주택임대차표준계약서',
      description: '2025.08.' + String(10 + ((id * 7) % 20)).padStart(2, '0'),
    }
  })

  const nextCursor = end < TOTAL ? end : null
  return { items, nextCursor, total: TOTAL }
}
