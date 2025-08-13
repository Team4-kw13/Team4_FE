import ListSiteAdviceItem from './ListSiteAdviceItem'

/**
 * 법률 상담 리스트 컴포넌트
 */

export const ListSiteAdviceList = () => {
  const adviceItems = [
    {
      title: '대한법률구조공단',
      description: '정부가 운영하는 무료 법률 상담 기관이에요.',
      showPhoneIcon: true,
    },
    {
      title: '서울외국인주민센터 전문상담',
      description: '외국인을 위한 전문 상담과 지원을 제공해요.',
      showPhoneIcon: true,
    },
    {
      title: '외국인종합안내센터',
      description: '한국 생활에 필요한 다양한 정보를 안내해줘요.',
      showViewLink: true,
    },
  ]

  return (
    <div>
      {adviceItems.map((item, index) => (
        <ListSiteAdviceItem
          key={index}
          title={item.title}
          description={item.description}
          showPhoneIcon={item.showPhoneIcon}
          showViewLink={item.showViewLink}
          onClick={() => console.log(`${item.title} clicked`)}
        />
      ))}
    </div>
  )
}
