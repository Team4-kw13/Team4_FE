import { useCallback } from 'react'

import { useListContract } from '../services/useListContract'

import ListContractItem from './ListContractItem'

import styles from './ListContractList.module.css'

export const ListContractList = () => {
  const { items, hasNext, loading, error, loadMore, reset, containerRef, sentinelRef } =
    useListContract()

  const handleRetry = useCallback(() => {
    reset()
    loadMore()
  }, [reset, loadMore])

  return (
    <div ref={containerRef} className={styles.container}>
      {items.map((c) => (
        <ListContractItem
          key={`contract-${c.contractId}`}
          contractId={c.contractId}
          contractName={c.contractName || `계약서 #${String(c.contractId).slice(-4)}`}
          description={c.createdDate}
        />
      ))}

      {loading && (
        <>
          <div className={styles.skeleton} />
          <div className={styles.skeleton} />
        </>
      )}

      {error && (
        <button className={styles.retry} onClick={handleRetry}>
          목록을 불러오는 중 오류가 발생했어요. 다시 시도
        </button>
      )}

      {/* 다음 페이지 트리거용 센티넬 */}
      {hasNext && !loading && !error && (
        <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
      )}
    </div>
  )
}

export default ListContractList
