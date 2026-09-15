import { useRef } from 'react'
import { H2, PillButton, scrollTo } from './ui'
import { media, site } from '../data/site'
import { useCountUp } from '../hooks/useReveal'

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useCountUp(value, ref)
  return (
    <div className="reveal">
      <p className="text-ink text-4xl md:text-5xl font-medium" style={{ letterSpacing: '-0.03em' }}>
        <span ref={ref}>0</span>{suffix}
      </p>
      <p className="text-ink/60 text-sm md:text-base mt-1">{label}</p>
    </div>
  )
}

export function Intro() {
  const years = new Date().getFullYear() - site.since
  return (
    <section id="about" className="bg-page px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 items-start">
          <div className="reveal">
            <H2 className="mb-8">Знакомьтесь:<br />АлтайГидроБур.</H2>
            <PillButton onClick={() => scrollTo('steps')}>Как мы работаем</PillButton>
          </div>
          <p className="reveal text-ink/70 text-xl sm:text-2xl md:text-3xl leading-relaxed">
            С 2010 года бурим скважины на воду для частных домов и организаций. Наши клиенты получают надёжный источник воды независимо от гидрологии местности и сложности участка.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          <Stat value={years} suffix="" label="лет на рынке Алтая" />
          <Stat value={200} suffix=" м" label="максимальная глубина" />
          <Stat value={0} suffix=" ₽" label="предоплаты и авансов" />
          <Stat value={5} suffix=" мин" label="перезвоним по заявке" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="reveal lg:col-span-2 rounded-2xl overflow-hidden relative min-h-80 flex flex-col justify-between p-7"
            style={{ backgroundImage: `url(${media('water.webp')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/55 to-white/30" />
            <h3 className="relative text-ink text-2xl font-medium leading-snug" style={{ letterSpacing: '-0.02em' }}>Вода, которую хочется пить</h3>
            <p className="relative text-ink/75 text-base max-w-xs">
              Берём воду на анализ и по результатам подбираем фильтрацию, чтобы вода из вашей скважины была максимально полезной.
            </p>
          </div>
          <div className="reveal rounded-2xl bg-deep-2 p-7 min-h-80 flex flex-col justify-between">
            <h3 className="text-white text-2xl font-medium leading-snug" style={{ letterSpacing: '-0.02em' }}>Ноль предоплаты,<br />ноль рисков.</h3>
            <p className="text-white/60 text-base">Не берём авансов. Расчёт — после подписания акта, когда вы видите чистую воду своими глазами.</p>
          </div>
          <div className="reveal rounded-2xl bg-deep-2 p-7 min-h-80 flex flex-col justify-between">
            <h3 className="text-white text-2xl font-medium leading-snug" style={{ letterSpacing: '-0.02em' }}>Свой парк<br />техники</h3>
            <p className="text-white/60 text-base">От малогабаритной установки до УРБ 2.5А на ЗИЛе — выполняем заказы в кратчайшие сроки даже в высокий сезон.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
