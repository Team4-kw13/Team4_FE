import ListLawyerItem from './ListContractItem'

import styles from './ListContractList.module.css'

export const ListContractList = () => {
  const base = [
    {
      title: '주택임대차표준계약서',
      description: '2025.08.18',
    },
    {
      title: '주택임대차표준계약서',
      description: '2025.08.18',
    },
    {
      title: '주택임대차표준계약서',
      description: '2025.08.18',
    },
  ]

  const lawyers = Array.from({ length: 12 }, (_, i) => ({
    ...base[i % base.length],
    id: i + 1,
  }))

  return (
    <div className={styles.list}>
      {lawyers.map((l) => (
        <ListLawyerItem
          key={l.id}
          title={l.title}
          lawFirm={l.lawFirm}
          description={l.description}
          onClick={() => console.log(`${l.title} clicked`)}
          iconName='chat'
        />
      ))}
    </div>
  )
}

export default ListContractList
