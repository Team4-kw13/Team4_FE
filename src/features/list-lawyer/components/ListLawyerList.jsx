import ListLawyerItem from './ListLawyerItem'

import styles from './ListLawyerList.module.css'

export const ListLawyerList = () => {
  const base = [
    {
      title: '강영현',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
    {
      title: '강영현',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
    {
      title: '강영현',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
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

export default ListLawyerList
