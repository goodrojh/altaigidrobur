import { Phone, Droplets } from 'lucide-react'
import { PillButton, scrollTo } from './ui'
import { BgVideo } from './BgVideo'
import { media, site } from '../data/site'
import { pricing } from '../data/pricing'

const facts = [
  { t: '0 ₽ предоплаты', s: { fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: 15 } },
  { t: 'С 2010 ГОДА', s: { fontFamily: 'Arial, sans-serif', fontWeight: 900, letterSpacing: '0.08em', fontSize: 13 } },
  { t: 'Глубина 5–200 м', s: { fontFamily: '"Trebuchet MS", sans-serif', fontWeight: 600, letterSpacing: '0.01em', fontSize: 15, fontStyle: 'italic' as const } },
  { t: 'ВОДОВОЗ ВКЛЮЧЁН', s: { fontFamily: '"Courier New", monospace', fontWeight: 700, letterSpacing: '0.12em', fontSize: 13 } },
  { t: 'Промывка до чистой воды', s: { fontFamily: 'Palatino, "Book Antiqua", serif', fontWeight: 400, letterSpacing: '-0.01em', fontSize: 16 } },
  { t: 'Анализ воды', s: { fontFamily: 'Impact, "Arial Narrow", sans-serif', fontWeight: 400, letterSpacing: '0.04em', fontSize: 14 } },
  { t: 'Договор с гарантией', s: { fontFamily: 'Verdana, sans-serif', fontWeight: 700, letterSpacing: '-0.03em', fontSize: 13 } },
]

export function Hero() {
  return (
    <section className="flex-1 px-4 sm:px-6 pt-[76px] sm:pt-24 pb-4 sm:pb-6 flex items-start sm:items-end">
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#dfe9ee]" style={{ height: 'calc(100svh - 92px)', minHeight: 560 }}>
        <BgVideo src={media('hero.mp4')} poster={media('hero.webp')} className="absolute inset-0 w-full h-full object-cover object-[72%_center] md:object-center" />
        {/* Мягкая засветка слева, чтобы текст читался на любом кадре */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/55 to-white/15 md:from-white/65 md:via-white/25 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white/80 to-transparent md:hidden" />

        <div className="relative z-10 flex flex-col items-start justify-start h-full p-6 sm:p-10 md:p-12 pt-10 sm:pt-16 md:pt-28">
          <p className="inline-flex items-center gap-2 text-ink/70 text-sm mb-5 bg-white/70 backdrop-blur px-3.5 py-1.5 rounded-full">
            <Droplets className="w-4 h-4 text-aqua" /> {site.region} · с {site.since} года
          </p>
          <h1 className="text-ink text-[2.6rem] leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl font-medium max-w-2xl mb-4" style={{ letterSpacing: '-0.04em' }}>
            Своя вода<br />на участке
          </h1>
          <p className="text-ink/75 text-base md:text-lg max-w-md mb-8 leading-relaxed">
            Бурим скважины от 5 до 200 м в Барнауле и по всему Алтайскому краю. Без предоплаты: платите только после акта, когда из скважины идёт чистая вода.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <PillButton size="lg" onClick={() => scrollTo('calc')}>Рассчитать стоимость</PillButton>
            <a href={site.phoneMainHref} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur text-ink text-base md:text-lg font-medium px-6 py-3 rounded-full hover:bg-white transition-colors duration-200">
              <Phone className="w-5 h-5" /> {site.phoneMain}
            </a>
          </div>

          {/* Акция с текущего сайта */}
          <div className="mt-auto pt-8 flex flex-col md:flex-row md:items-end md:justify-between w-full gap-6">
            <div className="w-full max-w-md overflow-hidden" aria-hidden="true">
              <div className="marquee-track">
                {[...facts, ...facts].map((f, i) => (
                  <span key={i} className="mx-7 shrink-0 text-ink/75 whitespace-nowrap" style={f.s}>{f.t}</span>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 bg-white/85 backdrop-blur rounded-2xl px-5 py-4 shadow-sm max-w-sm">
              <span className="relative pulse-ring w-3 h-3 rounded-full bg-aqua text-aqua shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider text-ink/50">Акция сезона</p>
                <p className="text-ink font-medium leading-snug">{pricing.promo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
