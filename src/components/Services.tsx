import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Eyebrow, scrollTo } from './ui'
import { media, services } from '../data/site'

export function Services() {
  const [active, setActive] = useState(0)
  const s = services[active]
  return (
    <section id="services" className="bg-page px-4 sm:px-6 py-16 sm:py-24 scroll-mt-6">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="md:pr-12 md:pt-2 reveal">
          <Eyebrow>Что мы делаем</Eyebrow>
          <h2 className="text-ink text-5xl md:text-6xl font-medium leading-none mb-6" style={{ letterSpacing: '-0.04em' }}>Услуги</h2>
          <p className="text-ink/60 text-base leading-relaxed max-w-sm mb-8">
            Полный цикл: от разведочного бурения до крана на кухне. Работаем с частными домами, СНТ, фермами и промышленными объектами.
          </p>
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
            {services.map((it, i) => (
              <button key={it.id} onClick={() => setActive(i)}
                className={`shrink-0 text-left rounded-2xl px-5 py-4 transition-colors duration-200 border ${i === active ? 'bg-ink text-white border-ink' : 'bg-white text-ink border-transparent hover:border-ink/15'}`}>
                <span className="block text-base md:text-lg font-medium">{it.title}</span>
                <span className={`block text-sm ${i === active ? 'text-white/60' : 'text-ink/50'}`}>{it.short}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="reveal relative rounded-3xl overflow-hidden min-h-[560px] md:min-h-[720px] bg-deep-2">
          {services.map((it, i) => (
            <img key={it.id} src={media(it.image)} alt="" loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
          <div className="relative z-10 p-7 sm:p-10 md:p-12 flex flex-col justify-end h-full min-h-[560px] md:min-h-[720px]">
            <h3 className="text-white text-4xl md:text-5xl font-medium leading-tight mb-5" style={{ letterSpacing: '-0.03em' }}>{s.title}</h3>
            <p className="text-white/80 text-base max-w-md mb-6">{s.text}</p>
            <ul className="mb-8 flex flex-col gap-2">
              {s.bullets.map(b => (
                <li key={b} className="flex items-start gap-2 text-white/90 text-sm md:text-base">
                  <Check className="w-4 h-4 mt-1 text-aqua shrink-0" /> {b}
                </li>
              ))}
            </ul>
            <button onClick={() => scrollTo('calc')} className="group inline-flex items-center gap-3 text-white font-medium">
              <span className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors">
                <ArrowRight className="w-4 h-4 text-black" />
              </span>
              Рассчитать стоимость
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
