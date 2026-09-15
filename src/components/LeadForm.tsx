import { useEffect, useState, type FormEvent } from 'react'
import { MessageCircle, Send, ShieldCheck } from 'lucide-react'
import { Eyebrow, PillButton } from './ui'
import { media, site } from '../data/site'

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, '').replace(/^8/, '7').slice(0, 11)
  if (!d) return ''
  let out = '+7'
  if (d.length > 1) out += ' (' + d.slice(1, 4)
  if (d.length >= 4) out += ') ' + d.slice(4, 7)
  if (d.length >= 7) out += '-' + d.slice(7, 9)
  if (d.length >= 9) out += '-' + d.slice(9, 11)
  return out
}

export function LeadForm({ prefill }: { prefill: string }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { if (prefill) setComment(prefill) }, [prefill])

  const valid = phone.replace(/\D/g, '').length === 11

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) { setError('Введите номер телефона полностью'); return }
    setError('')
    const text = [`Здравствуйте! Заявка с сайта ${site.name}.`, name && `Имя: ${name}`, `Телефон: ${phone}`, comment && `Комментарий: ${comment}`].filter(Boolean).join('\n')
    window.open(`${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setSent(true)
  }

  return (
    <section id="lead" className="bg-page px-4 sm:px-6 py-16 sm:py-24 scroll-mt-6">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="reveal relative rounded-3xl overflow-hidden min-h-[380px] lg:min-h-full bg-deep-2">
          <img src={media('master.webp')} alt="Мастер АлтайГидроБур с обсадной трубой" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <div className="relative z-10 p-7 sm:p-10 md:p-12 flex flex-col justify-end h-full min-h-[380px]">
            <p className="text-white/60 text-sm mb-2">Бесплатная консультация</p>
            <h2 className="text-white text-4xl md:text-5xl font-medium leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>Закажите скважину — получите лучшее предложение сезона</h2>
            <p className="text-white/75 text-base max-w-md">Расскажите, где участок, — назовём вероятную глубину и цену за метр уже по телефону.</p>
          </div>
        </div>

        <div className="reveal rounded-3xl bg-white p-6 sm:p-8 md:p-10">
          <Eyebrow>Оставить заявку</Eyebrow>
          <h3 className="text-ink text-2xl md:text-3xl font-medium mb-2" style={{ letterSpacing: '-0.02em' }}>Перезвоним в течение {site.responseMinutes} минут</h3>
          <p className="text-ink/50 text-sm mb-8">Или напишите нам напрямую в мессенджер — так быстрее.</p>

          {sent ? (
            <div className="rounded-2xl bg-aqua-light p-6 text-ink">
              <p className="text-xl font-medium mb-2">Спасибо! Заявка сформирована.</p>
              <p className="text-ink/70">Мы открыли WhatsApp с текстом заявки — просто нажмите «Отправить». Если окно не открылось, позвоните: <a href={site.phoneMainHref} className="font-medium underline">{site.phoneMain}</a>.</p>
              <button onClick={() => setSent(false)} className="mt-4 text-sm text-deep underline">Отправить ещё одну</button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm text-ink/60">Имя</span>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Как к вам обращаться" className="rounded-xl bg-page px-4 py-3.5 text-ink outline-none focus:ring-2 focus:ring-aqua transition" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm text-ink/60">Телефон *</span>
                  <input value={phone} onChange={e => setPhone(formatPhone(e.target.value))} inputMode="tel" placeholder="+7 (___) ___-__-__" required className={`rounded-xl bg-page px-4 py-3.5 text-ink outline-none focus:ring-2 transition ${error ? 'ring-2 ring-red-400' : 'focus:ring-aqua'}`} />
                </label>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm text-ink/60">Где участок и что нужно</span>
                <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3} placeholder="Например: с. Власиха, нужна скважина и заводка в дом" className="rounded-xl bg-page px-4 py-3.5 text-ink outline-none focus:ring-2 focus:ring-aqua transition resize-none" />
              </label>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <PillButton type="submit">Отправить заявку</PillButton>
                <a href={site.telegram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-page text-ink font-medium px-5 py-3 rounded-full hover:bg-aqua-light transition-colors"><Send className="w-4 h-4" /> Telegram</a>
                <a href={site.whatsapp} target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-page text-ink font-medium px-5 py-3 rounded-full hover:bg-aqua-light transition-colors"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
              </div>
              <p className="flex items-center gap-2 text-xs text-ink/40 mt-2"><ShieldCheck className="w-4 h-4" /> Мы не передаём ваши данные третьим лицам.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
