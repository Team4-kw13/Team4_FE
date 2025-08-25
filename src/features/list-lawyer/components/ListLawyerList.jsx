import ListLawyerItem from './ListLawyerItem'

import styles from './ListLawyerList.module.css'

export const ListLawyerList = () => {
  const lawyers = [
    {
      id: 1,
      title: '강영현',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
    {
      id: 2,
      title: '박경민',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
    {
      id: 3,
      title: '김현진',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
    {
      id: 4,
      title: '정서진',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
    {
      id: 5,
      title: '고은빈',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
    {
      id: 6,
      title: '이효원',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
    {
      id: 7,
      title: '황지영',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
    {
      id: 8,
      title: '김동균',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
    {
      id: 9,
      title: '정지환',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
    {
      id: 10,
      title: '박현지',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
    },
  ]

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
