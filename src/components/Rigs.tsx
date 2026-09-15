import { Eyebrow, H2 } from './ui'
import { media, rigs } from '../data/site'

export function Rigs() {
  return (
    <section id="rigs" className="bg-page px-4 sm:px-6 py-16 sm:py-24 scroll-mt-6">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-14 items-end">
          <div className="reveal">
            <Eyebrow>Собственный парк</Eyebrow>
            <H2>Три установки —<br />под любую глубину</H2>
          </div>
          <p className="reveal text-ink/60 text-base md:text-lg leading-relaxed max-w-md md:justify-self-end">
            Подбираем технику под участок: во двор частного дома заедет малогабаритка, для артезианской скважины на 140–200 м приедет УРБ на ЗИЛе. Плюс водовоз в каждой бригаде.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rigs.map((r, i) => (
            <article key={r.title} className="reveal group rounded-2xl overflow-hidden bg-white flex flex-col" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={media(r.image)} alt={r.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-ink text-sm font-medium px-3 py-1 rounded-full">{r.depth}</span>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h3 className="text-ink text-xl font-medium" style={{ letterSpacing: '-0.02em' }}>{r.title}</h3>
                <p className="text-ink/60 text-base leading-relaxed">{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
