import { useEffect, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Eyebrow, H2, scrollTo } from './ui'
import { BgVideo } from './BgVideo'
import { media, works } from '../data/site'

export function Works() {
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen(o => (o! + 1) % works.length)
      if (e.key === 'ArrowLeft') setOpen(o => (o! - 1 + works.length) % works.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <section id="works" className="bg-page px-4 sm:px-6 py-16 sm:py-24 scroll-mt-6">
      <div className="max-w-[88rem] mx-auto">
        <div className="reveal mb-10 md:mb-14 max-w-2xl">
          <Eyebrow>Наши работы</Eyebrow>
          <H2>Реальные объекты<br />этого сезона</H2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {works.map((w, i) => (
            <button key={w.img} onClick={() => setOpen(i)} className="reveal group relative rounded-2xl overflow-hidden aspect-[3/4] bg-deep-2 text-left" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
              <img src={media(w.img)} alt={`${w.title} — ${w.place}`} loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/5" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="text-white font-medium leading-snug text-sm md:text-base">{w.title}</p>
                <p className="text-white/60 text-xs md:text-sm mt-1">{w.place}</p>
              </div>
            </button>
          ))}
        </div>

        {/* B2B card with the aerial video */}
        <div className="reveal mt-4 relative rounded-3xl overflow-hidden min-h-[420px] md:min-h-[520px] bg-deep-2">
          <BgVideo src={media('aerial.mp4')} poster={media('aerial.webp')} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/65 to-ink/25 md:bg-gradient-to-r md:from-ink/85 md:via-ink/50 md:to-ink/10" />
          <div className="relative z-10 p-7 sm:p-10 md:p-12 flex flex-col justify-end h-full min-h-[420px] md:min-h-[520px]">
            <p className="text-white/60 text-sm mb-2">Для бизнеса и СНТ</p>
            <h3 className="text-white text-3xl md:text-5xl font-medium leading-tight mb-5 max-w-xl" style={{ letterSpacing: '-0.03em' }}>Скважины для ферм, производств и посёлков</h3>
            <p className="text-white/75 text-base max-w-md mb-8">
              Пробурили 140 м для логистического комплекса в Алтайском крае. Работаем по договору с юрлицами, закрывающие документы, гарантийные обязательства прописаны.
            </p>
            <button onClick={() => scrollTo('lead')} className="group inline-flex items-center gap-3 text-white font-medium">
              <span className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors">
                <ArrowRight className="w-4 h-4 text-black" />
              </span>
              Обсудить объект
            </button>
          </div>
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-50 bg-ink/90 backdrop-blur flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <button aria-label="Закрыть" className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"><X className="w-5 h-5" /></button>
          <button aria-label="Назад" onClick={e => { e.stopPropagation(); setOpen((open - 1 + works.length) % works.length) }} className="absolute left-3 md:left-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"><ChevronLeft className="w-5 h-5" /></button>
          <button aria-label="Вперёд" onClick={e => { e.stopPropagation(); setOpen((open + 1) % works.length) }} className="absolute right-3 md:right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"><ChevronRight className="w-5 h-5" /></button>
          <figure className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={media(works[open].img)} alt={works[open].title} className="w-full max-h-[78vh] object-contain rounded-2xl" />
            <figcaption className="text-white mt-4 text-center">
              <p className="font-medium">{works[open].title}</p>
              <p className="text-white/60 text-sm">{works[open].place}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
