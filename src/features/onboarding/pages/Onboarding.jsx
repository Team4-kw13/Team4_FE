import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'

import iconB from '@/assets/images/folder.svg'
import iconE from '@/assets/images/note.svg'
import img2 from '@/assets/onboarding/onboarding2.svg'
import img3 from '@/assets/onboarding/onboarding3.svg'
import iconA from '@/assets/onboarding/onboarding4.svg'
import iconC from '@/assets/onboarding/onboarding5.svg'
import iconD from '@/assets/onboarding/onboarding6.svg'
import iconF from '@/assets/onboarding/onboarding7.svg'

import { OnboardingBar } from '../components/OnboardingBar'
import { OnboardingButton } from '../components/OnboardingButton'
import { OnboardingItem } from '../components/OnboardingItem'

import styles from './Onboarding.module.css'

export function Onboarding() {
  const nav = useNavigate()

  const ITEMS = useMemo(
    () => [
      {
        id: 0,
        lines: ['복잡한 부동산 계약서,', '이해하기 어렵나요?'],
        images: [iconA, iconB, iconC, iconD, iconE, iconF], // ★ 6장 묶음
        alt: '계약 관련 아이콘 6개',
        halo: 'halo1',
      },
      {
        id: 1,
        lines: ['중요한 조항을', '한집말이가 설명할게요!'],
        image: img2,
        alt: '로봇',
        halo: 'halo2',
      },
      {
        id: 2,
        lines: ['부동산 계약서 이해의 시작', '한집말이와 함께해요.'],
        image: img3,
        alt: '집+별',
        halo: 'halo3',
      },
    ],
    [],
  )

  const [step, setStep] = useState(0)
  const last = step === ITEMS.length - 1

  const clamp = useCallback((v) => Math.max(0, Math.min(v, ITEMS.length - 1)), [ITEMS.length])

  const go = useCallback(
    (deltaOrIndex) =>
      setStep((s) => {
        const next =
          typeof deltaOrIndex === 'number' && deltaOrIndex % 1 === 0
            ? deltaOrIndex > ITEMS.length
              ? ITEMS.length - 1
              : deltaOrIndex < 0
              ? 0
              : Number.isInteger(deltaOrIndex) && Math.abs(deltaOrIndex) > 1
              ? deltaOrIndex
              : s + deltaOrIndex
            : s
        return clamp(
          typeof deltaOrIndex === 'number' && Math.abs(deltaOrIndex) <= 1 ? s + deltaOrIndex : next,
        )
      }),
    [clamp, ITEMS.length],
  )

  const next = useCallback(() => {
    if (!last) go(+1)
  }, [last, go])
  const prev = useCallback(() => go(-1), [go])

  const handleCTA = useCallback(() => {
    if (last) nav('/home')
    else go(+1)
  }, [last, nav, go])

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
    preventScrollOnSwipe: true,
    delta: 10,
  })

  return (
    <section className={styles.container}>
      <div className={styles.viewport} {...handlers}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${step * 100}%)` }}
          aria-live='polite'
        >
          {ITEMS.map((it) => (
            <div className={styles.slide} key={it.id}>
              <OnboardingItem
                lines={it.lines}
                image={Array.isArray(it.image) ? undefined : it.image}
                images={Array.isArray(it.image) ? it.image : it.images} // 방어적 전달
                alt={it.alt}
                halo={it.halo}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <OnboardingBar total={ITEMS.length} activeIndex={step} onSelect={(i) => setStep(i)} />
        <OnboardingButton onClick={handleCTA}>
          {last ? '한집말이 시작하기' : '한집말이 시작하기'}
        </OnboardingButton>
      </div>
    </section>
  )
}
