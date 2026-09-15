import { useState } from 'react'
import { Eyebrow, H2 } from './ui'

type Part = { id: string; title: string; text: string }

const parts: Part[] = [
  { id: 'caisson', title: 'Кессон / колодец', text: 'Герметичная камера у оголовка скважины ниже глубины промерзания. В ней стоят гидроаккумулятор и автоматика, а вода зимой не замерзает.' },
  { id: 'auto', title: 'Гидроаккумулятор и автоматика', text: 'Реле давления включает насос только когда вы открываете кран. Давление в доме стабильное, как в городской сети.' },
  { id: 'pipe', title: 'Заводка в дом', text: 'Труба ПНД от кессона до дома укладывается в траншею ниже промерзания — вода круглый год без утеплителя и греющего кабеля.' },
  { id: 'casing', title: 'Обсадная труба', text: 'нПВХ до 80 м, глубже — шовная металлическая. Держит стенки ствола и отсекает верховодку и грязную воду.' },
  { id: 'pump', title: 'Погружной насос', text: 'Подбираем под дебит скважины и расход дома. Монтаж насосного оборудования по акции — бесплатно.' },
  { id: 'filter', title: 'Фильтровая колонна', text: 'Изготавливаем под конкретный водоносный слой. Пропускает воду и задерживает песок — скважина живёт долго.' },
  { id: 'aquifer', title: 'Водоносный слой', text: 'Песок или трещиноватая порода, насыщенные водой. Глубина в большинстве районов края нам известна из опыта.' },
]

export function WellDiagram() {
  const [hover, setHover] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string>('casing')
  const current = hover ?? pinned
  const active = parts.find(p => p.id === current)!
  const cls = (id: string) => `well-layer ${current && current !== id ? 'dim' : ''}`
  const bind = (id: string) => ({
    onMouseEnter: () => setHover(id), onMouseLeave: () => setHover(null), onClick: () => setPinned(id),
    className: cls(id), role: 'button', tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') setPinned(id) },
  })

  return (
    <section id="well" className="bg-page px-4 sm:px-6 py-16 sm:py-24 scroll-mt-6">
      <div className="max-w-[88rem] mx-auto">
        <div className="reveal mb-10 md:mb-14 max-w-2xl">
          <Eyebrow>Наведите или нажмите на элемент</Eyebrow>
          <H2>Как устроена скважина,<br />которую мы сдаём</H2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          <div className="reveal lg:col-span-3 rounded-3xl bg-white p-4 sm:p-6 overflow-hidden">
            <svg viewBox="0 0 640 620" className="w-full h-auto select-none" aria-label="Схема скважины">
              {/* Sky and ground layers */}
              <rect x="0" y="0" width="640" height="150" fill="#EAF3F7" />
              <rect x="0" y="150" width="640" height="90" fill="#D9C7A3" />
              <rect x="0" y="240" width="640" height="150" fill="#B79C74" />
              <g {...bind('aquifer')}>
                <rect x="0" y="390" width="640" height="130" fill="#9ED3DE" />
                <g stroke="#5FB4C3" strokeWidth="2" fill="none" opacity=".7">
                  {[410, 440, 470, 500].map(y => <path key={y} d={`M0 ${y} q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0`} />)}
                </g>
              </g>
              <rect x="0" y="520" width="640" height="100" fill="#7A7F86" />
              <text x="16" y="178" fontSize="12" fill="#5c4d33">почва</text>
              <text x="16" y="268" fontSize="12" fill="#f7f0e4">глина</text>
              <text x="16" y="418" fontSize="12" fill="#0A3A59">водоносный песок</text>
              <text x="16" y="548" fontSize="12" fill="#e8e8e8">скала</text>

              {/* House on the right */}
              <g>
                <rect x="470" y="70" width="140" height="80" fill="#ffffff" stroke="#0B1F2E" strokeWidth="2" />
                <path d="M460 72 L540 20 L620 72 Z" fill="#0E4C73" />
                <rect x="520" y="105" width="30" height="45" fill="#0E4C73" opacity=".85" />
                <rect x="485" y="88" width="22" height="20" fill="#9ED3DE" />
                <rect x="575" y="88" width="22" height="20" fill="#9ED3DE" />
                <rect x="590" y="30" width="12" height="30" fill="#0B1F2E" />
              </g>

              {/* Pipe to house */}
              <g {...bind('pipe')}>
                <path d="M275 210 H505 V150" stroke="#1B9AAA" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M275 210 H505 V150" stroke="#DCF1F4" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="8 10" />
              </g>

              {/* Caisson */}
              <g {...bind('caisson')}>
                <rect x="180" y="140" width="130" height="100" rx="8" fill="#31373D" />
                <rect x="186" y="146" width="118" height="88" rx="6" fill="#4A5158" />
                <rect x="170" y="134" width="150" height="10" rx="3" fill="#0B1F2E" />
              </g>
              {/* Automation inside caisson */}
              <g {...bind('auto')}>
                <rect x="196" y="168" width="34" height="56" rx="14" fill="#1B6FB5" stroke="#0B1F2E" strokeWidth="2" />
                <rect x="236" y="182" width="24" height="20" rx="4" fill="#E9EDF0" stroke="#0B1F2E" strokeWidth="2" />
                <circle cx="248" cy="192" r="5" fill="#1B9AAA" />
                <path d="M230 200 H236" stroke="#0B1F2E" strokeWidth="3" />
              </g>

              {/* Borehole shadow */}
              <rect x="256" y="150" width="28" height="370" fill="#6b5b45" opacity=".35" />

              {/* Casing */}
              <g {...bind('casing')}>
                <rect x="260" y="150" width="20" height="300" fill="#1B6FB5" />
                <rect x="264" y="150" width="4" height="300" fill="#7FB3E6" opacity=".7" />
                {[210, 270, 330, 390].map(y => <rect key={y} x="258" y={y} width="24" height="6" fill="#0E4C73" />)}
              </g>

              {/* Filter column */}
              <g {...bind('filter')}>
                <rect x="260" y="450" width="20" height="60" fill="#1B6FB5" />
                {[458, 468, 478, 488, 498].map(y => <rect key={y} x="262" y={y} width="16" height="3" fill="#DCF1F4" />)}
                <path d="M260 510 L270 522 L280 510 Z" fill="#0E4C73" />
              </g>

              {/* Pump */}
              <g {...bind('pump')}>
                <rect x="263" y="400" width="14" height="46" rx="4" fill="#0B1F2E" />
                <rect x="266" y="404" width="8" height="10" fill="#1B9AAA" />
                <path d="M270 400 V240" stroke="#0B1F2E" strokeWidth="2" />
              </g>

              {/* Water arrows inside casing */}
              <g fill="#DCF1F4" opacity=".9">
                {[380, 320, 260].map(y => <path key={y} d={`M270 ${y + 12} l-5 6 h10 z`} />)}
              </g>

              {/* Labels */}
              <g fontSize="13" fill="#0B1F2E" fontWeight="500">
                <text x="330" y="180">кессон</text>
                <text x="330" y="232">→ в дом</text>
                <text x="296" y="300">обсадная труба</text>
                <text x="296" y="428">насос</text>
                <text x="296" y="484">фильтр</text>
              </g>
            </svg>
          </div>

          <div className="reveal lg:col-span-2 flex flex-col gap-3">
            <div className="rounded-3xl bg-deep-2 text-white p-7 md:p-8 min-h-56 flex flex-col justify-between">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Элемент скважины</p>
                <h3 className="text-2xl md:text-3xl font-medium leading-snug mb-3" style={{ letterSpacing: '-0.02em' }}>{active.title}</h3>
                <p className="text-white/70 text-base leading-relaxed">{active.text}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {parts.map(p => (
                <button key={p.id} onClick={() => setPinned(p.id)} onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)}
                  className={`text-left text-sm rounded-xl px-4 py-3 transition-colors duration-200 ${current === p.id ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-aqua-light'}`}>
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
