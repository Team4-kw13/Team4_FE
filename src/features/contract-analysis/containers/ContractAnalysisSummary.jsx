import { AnalysisSummarySection } from '@/components/analysis-summary-section/AnalysisSummarySection'
import { Icon } from '@/components/Icon/Icon'
import { UnderlineText } from '@/components/UnderlineText/UnderlineText'

import styles from './ContractAnalysisSummary.module.css'

const dummy = {
  summary: [
    {
      title: '1. 계약 기본 정보',
      subTitle: '임대인과 임차인 간의 주택 임대차 계약 주요 내용',
      content: [
        '임대인 ‘멋쟁이’와 임차인 ‘김사자’가 서울특별시 노원구 광운로 21 소재의 다가구주택 일부(면적 21㎡)를 대상으로 임대차 계약을 체결함.',
        '계약 기간은 2025년 8월 21일부터 2027년 8월 21일까지이며, 보증금은 1,000만 원, 월세는 50만 원으로 책정됨.',
        '계약금 200만 원은 계약 시 지급, 중도금 100만 원은 2025년 8월 21일 지급, 잔금 1,800만 원은 같은 날 지급.',
        '관리비는 월 10만 원으로, 일반관리비·전기료·수도료·가스비·난방비·인터넷·TV사용료·기타 관리비 등 세부 항목이 명시됨.',
      ],
    },
    {
      title: '2. 유지·수선 및 사용 조건',
      subTitle: '주택 사용, 수리, 비용 부담에 관한 합의',
      content: [
        '임대인은 계약 기간 동안 주택을 사용·수익 가능한 상태로 유지해야 하며, 임차인은 주거 외 용도로 사용하거나 구조 변경, 전대, 임차권 양도를 할 수 없음.',
        '주요 설비(난방, 전기, 수도 등)의 노후·불량에 따른 수선은 임대인 부담, 임차인의 과실로 인한 파손이나 소모품 교체는 임차인 부담.',
        '입주 전 세면대 수리를 하기로 합의했으며, 잔금 지급일인 2025년 9월까지 완료 예정.',
      ],
    },
    {
      title: '3. 계약 해제·해지 조건',
      subTitle: '계약을 종료하거나 갱신하지 않는 조건',
      content: [
        '중도금 또는 잔금 지급 전에는 계약금 배액 상환(임대인) 또는 계약금 포기(임차인)로 해제 가능.',
        '임차인은 과실 없이 주택 일부가 멸실되거나 사용 불가 시 해지 가능.',
        '임대인은 임차인이 2기분 월세 연체 또는 무단 구조변경·전대 시 해지 가능.',
        '임차인은 계약 종료 6개월 전부터 2개월 전까지 계약 갱신을 요구할 수 있으며, 법에서 정한 사유 외 거절 불가.',
      ],
    },
    {
      title: '4. 특약 사항',
      subTitle: '추가로 합의한 조건',
      content: [
        '임차인은 2025년 9월 2일까지 전입신고를 완료해야 하며, 임대인은 그 다음날까지 담보권 설정 불가.',
        '임대인이 특약을 위반해 담보권 설정 시, 임차인은 계약 해제 및 손해배상 청구 가능.',
        '임차인은 임대인이 사전 고지하지 않은 금전 또는 물건을 요구받을 경우 계약 해제 가능.',
      ],
    },
  ],
  warning: [
    {
      title: '1. 전세금·월세 지급 관련 주의',
      subTitle: '계약금, 중도금, 잔금, 월세 지급 시기와 방식 확인 필요',
      content: [
        '중도금과 잔금 지급일이 동일(2025년 8월 21일)로 설정되어 있어, 실제 지급 일정과 혼동 가능성 있음.',
        '계약금·중도금·잔금 지급 내역은 반드시 영수증 등 증빙 자료로 남겨야 함.',
      ],
    },
    {
      title: '2. 관리비 항목 세부 확인 필요',
      subTitle: '관리비 고정 금액 외 추가 비용 발생 가능성',
      content: [
        '관리비 총액 10만 원에 세부 항목이 명시되어 있으나, ‘기타 관리비’ 명목으로 추가 부과 가능성이 있음.',
        '정액이 아닌 경우 사용량 비례 관리비 산정 방식이 모호하므로, 실제 부과 기준을 명확히 해야 함.',
      ],
    },
    {
      title: '3. 계약 해지·갱신 조건',
      subTitle: '법정 해지 사유와 특약 조건 차이 유의',
      content: [
        "계약 해지 사유 중 '2기분 월세 연체'나 '무단 구조 변경'은 임대인의 즉시 해지 사유가 됨.",
        '계약 갱신 거절 사유가 법에 따라 제한되지만, 특약에서 불리하게 합의될 가능성 있음.',
      ],
    },
    {
      title: '4. 특약 위반 시 손해배상',
      subTitle: '담보권 설정 및 사전 고지 위반에 따른 리스크',
      content: [
        '임대인이 전입신고 기한 전에 담보권 설정 시, 임차인의 계약 해제 및 손해배상 청구 가능하지만 실제 집행 과정에서 분쟁 가능성 있음.',
        '사전 고지 없이 금전·물건을 요구한 경우 계약 해제가 가능하나, 이를 입증하기 어려울 수 있음.',
      ],
    },
    {
      title: '5. 수리 합의 사항',
      subTitle: '세면대 수리 기한과 완료 여부 확인 필요',
      content: [
        '세면대 수리를 2025년 9월까지 완료하기로 했으나, 구체적인 날짜와 품질 기준이 없어 분쟁 가능성 존재.',
        '수리 완료 후 확인 절차 및 기록을 남겨야 함.',
      ],
    },
  ],
}

export const ContractAnalysisSummary = () => {
  const { summary, warning } = dummy

  return (
    <div className={styles['container']}>
      <section className={styles['important-section']}>
        <header className={styles['header']}>
          <Icon name='bookmark' width={34} height={50} />
          <div>
            <h2>
              <UnderlineText>핵심만</UnderlineText> 쏙 모았어요.
            </h2>
            <h2>우리 먼저 여기부터 체크해요!</h2>
          </div>
        </header>

        <AnalysisSummarySection items={summary} />
      </section>

      <section className={styles['warning-section']}>
        <header className={styles['header']}>
          <Icon name='warning' width={37} height={49} />
          <div>
            <h2>
              <UnderlineText>놓치지 쉬운 부분</UnderlineText>이에요.
            </h2>
            <h2>가기 전에 한 번 더 확인해요!</h2>
          </div>
        </header>

        <AnalysisSummarySection items={warning} />
      </section>
    </div>
  )
}
