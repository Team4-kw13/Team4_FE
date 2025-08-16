import ListLawyerItem from './ListContractItem'

import styles from './ListContractList.module.css'

const dummy = [
  {
    id: 1,
    title: '주택임대차표준계약서',
    description: '2025.08.18',
  },
  {
    id: 2,
    title: '주택임대차표준계약서',
    description: '2025.08.18',
  },
  {
    id: 3,
    title: '주택임대차표준계약서',
    description: '2025.08.18',
  },
]

export const ListContractList = () => {
  return (
    <div className={styles.list}>
      {dummy.map((contract) => (
        <ListLawyerItem
          key={contract.id}
          contractId={contract.id}
          title={contract.title}
          lawFirm={contract.lawFirm}
          description={contract.description}
          onClick={() => console.log(`${contract.title} clicked`)}
          iconName='chat'
        />
      ))}
    </div>
  )
}

export default ListContractList
