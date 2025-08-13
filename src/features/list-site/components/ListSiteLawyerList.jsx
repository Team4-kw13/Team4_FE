import ListSiteAdviceItem from './ListSiteLawyerItem'

/**
 * 변호사 리스트 컴포넌트
 */

export const ListSiteLawyerList = () => {
  const adviceItems = [
    {
      title: '강영현',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
      showPhoneIcon: true,
    },
    {
      title: '강영현',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
      showPhoneIcon: true,
    },
    {
      title: '강영현',
      lawFirm: '법무법인 계란',
      description: '[4대 보험, 법인 설립] 계약서 작성, 계약 해지',
      showPhoneIcon: true,
    },
  ]

  return (
    <div>
      {adviceItems.map((item, index) => (
        <ListSiteAdviceItem
          key={index}
          title={item.title}
          description={item.description}
          lawFirm={item.lawFirm}
          showPhoneIcon={item.showPhoneIcon}
          showViewLink={item.showViewLink}
          onClick={() => console.log(`${item.title} clicked`)}
        />
      ))}
    </div>
  )
}
