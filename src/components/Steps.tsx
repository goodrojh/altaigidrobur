import { useState } from 'react'
import { Eyebrow, H2 } from './ui'
import { steps } from '../data/site'

export function Steps() {
  const [active, setActive] = useState(0)
  return (
    <section id="steps" className="bg-page px-4 sm:px-6 py-16 sm:py-24 scroll-mt-6">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-14 items-end">
          <div className="reveal">
            <Eyebrow>Этапы работы</Eyebrow>
            <H2>От звонка до чистой воды —<br />четыре шага</H2>
          </div>
          <p className="reveal text-ink/60 text-base md:text-lg leading-relaxed max-w-md md:justify-self-end">
            Работаем на результат: никаких предоплат и авансов. Вы платите, когда скважина сдана и вода идёт.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {steps.map((s, i) => {
            const on = i === active
            return (
              <button key={s.n} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}
                className={`reveal text-left rounded-2xl p-6 md:p-7 min-h-56 md:min-h-72 flex flex-col justify-between transition-colors duration-300 ${on ? 'bg-deep-2 text-white' : 'bg-white text-ink'}`}
                style={{ transitionDelay: `${i * 60}ms` }}>
                <span className={`text-sm font-medium ${on ? 'text-aqua' : 'text-ink/40'}`}>{s.n}</span>
                <span>
                  <span className="block text-2xl font-medium mb-2" style={{ letterSpacing: '-0.02em' }}>{s.title}</span>
                  <span className={`block text-base leading-relaxed ${on ? 'text-white/70' : 'text-ink/60'}`}>{s.text}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
