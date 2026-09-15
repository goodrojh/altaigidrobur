import { useMemo, useState } from 'react'
import { Info } from 'lucide-react'
import { Eyebrow, H2, PillButton, scrollTo } from './ui'
import { estimate, fmt, pricing, type SetupKind } from '../data/pricing'
import { site } from '../data/site'

const setups: { id: SetupKind; title: string; text: string }[] = [
  { id: 'none', title: 'Только бурение', text: 'Скважина с обсадкой и фильтром, промытая до чистой воды' },
  { id: 'adapter', title: 'Адаптер + заводка', text: 'Скважинный адаптер, труба в дом ниже промерзания' },
  { id: 'caisson', title: 'Кессон + заводка', text: 'Кессон, гидроаккумулятор в нём, труба в дом' },
]

export function Calculator({ onRequest }: { onRequest: (summary: string) => void }) {
  const [depth, setDepth] = useState(40)
  const [setup, setSetup] = useState<SetupKind>('adapter')
  const [automation, setAutomation] = useState(true)
  const est = useMemo(() => estimate(depth, setup, automation), [depth, setup, automation])
  const pct = ((depth - site.depthMin) / (site.depthMax - site.depthMin)) * 100

  const summary = `Глубина ~${depth} м (${est.rig}, ${est.casing}); ${setups.find(s => s.id === setup)!.title}${automation ? ' + автоматика' : ''}. Ориентировочно ${fmt(est.total)}.`

  return (
    <section id="calc" className="bg-page px-4 sm:px-6 py-16 sm:py-24 scroll-mt-6">
      <div className="max-w-[88rem] mx-auto">
        <div className="reveal mb-10 md:mb-14 max-w-2xl">
          <Eyebrow>Калькулятор</Eyebrow>
          <H2>Прикиньте стоимость<br />за 30 секунд</H2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="reveal lg:col-span-3 rounded-3xl bg-white p-6 sm:p-8 md:p-10 flex flex-col gap-8">
            <div>
              <div className="flex items-end justify-between mb-4">
                <label htmlFor="depth" className="text-ink/60 text-sm">Предполагаемая глубина</label>
                <span className="text-ink text-4xl md:text-5xl font-medium leading-none" style={{ letterSpacing: '-0.03em' }}>{depth} <span className="text-2xl text-ink/50">м</span></span>
              </div>
              <input id="depth" type="range" min={site.depthMin} max={site.depthMax} step={1} value={depth}
                onChange={e => setDepth(Number(e.target.value))} className="slider w-full" style={{ ['--pct' as string]: `${pct}%` }} />
              <div className="flex justify-between text-xs text-ink/40 mt-2"><span>{site.depthMin} м</span><span>60 м</span><span>80 м</span><span>{site.depthMax} м</span></div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="bg-aqua-light text-deep px-3 py-1.5 rounded-full">{est.rig}</span>
                <span className="bg-sand-light text-ink px-3 py-1.5 rounded-full">{est.casing}</span>
              </div>
            </div>

            <div>
              <p className="text-ink/60 text-sm mb-3">Обустройство</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {setups.map(s => (
                  <button key={s.id} onClick={() => setSetup(s.id)}
                    className={`text-left rounded-2xl p-4 border transition-colors duration-200 ${setup === s.id ? 'bg-ink text-white border-ink' : 'bg-page text-ink border-transparent hover:border-ink/15'}`}>
                    <span className="block font-medium">{s.title}</span>
                    <span className={`block text-sm mt-1 ${setup === s.id ? 'text-white/60' : 'text-ink/50'}`}>{s.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center justify-between gap-4 rounded-2xl bg-page p-4 cursor-pointer">
              <span>
                <span className="block font-medium text-ink">Автоматика и гидроаккумулятор</span>
                <span className="block text-sm text-ink/50">Реле давления, гидробак, обвязка. {pricing.promo.toLowerCase()}</span>
              </span>
              <span onClick={() => setAutomation(a => !a)} role="switch" aria-checked={automation}
                className={`relative w-14 h-8 rounded-full transition-colors duration-200 shrink-0 ${automation ? 'bg-aqua' : 'bg-gray-300'}`}>
                <span className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ${automation ? 'translate-x-7' : 'translate-x-1'}`} />
              </span>
            </label>
          </div>

          <div className="reveal lg:col-span-2 rounded-3xl bg-deep-2 text-white p-6 sm:p-8 md:p-10 flex flex-col">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Ориентировочно</p>
            <p className="text-5xl md:text-6xl font-medium leading-none mb-8" style={{ letterSpacing: '-0.04em' }}>{fmt(est.total)}</p>
            <dl className="flex flex-col gap-3 text-base border-t border-white/10 pt-6 mb-8">
              <div className="flex justify-between gap-4"><dt className="text-white/60">Бурение {depth} м × {fmt(est.rate)}</dt><dd>{fmt(est.drilling)}</dd></div>
              {est.setupCost > 0 && <div className="flex justify-between gap-4"><dt className="text-white/60">Обустройство</dt><dd>{fmt(est.setupCost)}</dd></div>}
              {est.auto > 0 && <div className="flex justify-between gap-4"><dt className="text-white/60">Автоматика</dt><dd>{fmt(est.auto)}</dd></div>}
              <div className="flex justify-between gap-4"><dt className="text-white/60">Монтаж насоса</dt><dd className="text-aqua">бесплатно</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/60">Предоплата</dt><dd>0 ₽</dd></div>
            </dl>
            <p className="flex items-start gap-2 text-white/50 text-sm leading-relaxed mb-8">
              <Info className="w-4 h-4 mt-0.5 shrink-0" /> Точную цену назовёт инженер после выезда: она зависит от грунта, реальной глубины и диаметра обсадки. Платите по факту пробуренных метров.
            </p>
            <div className="mt-auto">
              <PillButton tone="white" onClick={() => { onRequest(summary); scrollTo('lead') }}>Получить точный расчёт</PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
