import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Eyebrow, H2 } from './ui'
import { faq } from '../data/site'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="bg-page px-4 sm:px-6 py-16 sm:py-24 scroll-mt-6">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="reveal md:sticky md:top-8">
          <Eyebrow>Вопрос — ответ</Eyebrow>
          <H2>Что спрашивают<br />перед бурением</H2>
          <p className="text-ink/60 text-base leading-relaxed max-w-sm mt-6">
            Не нашли ответ? Позвоните — консультация бесплатная, а глубину в вашем районе мы, скорее всего, уже знаем.
          </p>
        </div>
        <div className="reveal flex flex-col gap-2">
          {faq.map((f, i) => {
            const on = open === i
            return (
              <div key={f.q} className={`rounded-2xl transition-colors duration-200 ${on ? 'bg-white' : 'bg-white/60 hover:bg-white'}`}>
                <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6">
                  <span className="text-ink text-lg md:text-xl font-medium" style={{ letterSpacing: '-0.01em' }}>{f.q}</span>
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${on ? 'bg-ink text-white rotate-45' : 'bg-page text-ink'}`}>
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: on ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <p className="text-ink/70 text-base leading-relaxed px-5 md:px-6 pb-5 md:pb-6">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
