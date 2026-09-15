import { Camera, Mail, MessageCircle, Phone, Send } from 'lucide-react'
import { LogoIcon, scrollTo } from './ui'
import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="bg-page px-4 sm:px-6 pt-8 pb-28 sm:pb-10">
      <div className="max-w-[88rem] mx-auto rounded-3xl bg-ink text-white p-7 sm:p-10 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4"><LogoIcon className="w-7 h-7 text-aqua" /><span className="text-2xl font-medium tracking-tight">{site.name}</span></div>
            <p className="text-white/60 text-base max-w-xs leading-relaxed">Бурение скважин на воду в Барнауле и Алтайском крае с {site.since} года. Обустройство, автоматика, канализация под ключ.</p>
          </div>
          <div className="flex flex-col gap-3 text-base">
            <a href={site.phoneMainHref} className="flex items-center gap-3 hover:text-aqua transition-colors"><Phone className="w-4 h-4 text-aqua" /> {site.phoneMain}</a>
            <a href={site.phoneCityHref} className="flex items-center gap-3 hover:text-aqua transition-colors"><Phone className="w-4 h-4 text-aqua" /> {site.phoneCity}</a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-aqua transition-colors"><Mail className="w-4 h-4 text-aqua" /> {site.email}</a>
            <div className="flex gap-2 mt-2">
              <a aria-label="WhatsApp" href={site.whatsapp} target="_blank" rel="noopener" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"><MessageCircle className="w-5 h-5" /></a>
              <a aria-label="Telegram" href={site.telegram} target="_blank" rel="noopener" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"><Send className="w-5 h-5" /></a>
              <a aria-label="Instagram" href={site.instagram} target="_blank" rel="noopener" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"><Camera className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-base md:items-end">
            {[['services', 'Услуги'], ['well', 'Схема скважины'], ['rigs', 'Техника'], ['calc', 'Калькулятор'], ['works', 'Наши работы'], ['faq', 'Вопросы']].map(([id, l]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-white/70 hover:text-white transition-colors text-left md:text-right">{l}</button>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-sm text-white/40">
          <span>© {new Date().getFullYear()} {site.name}. {site.region}.</span>
          <span>Instagram принадлежит Meta, признанной экстремистской и запрещённой в РФ.</span>
        </div>
      </div>
    </footer>
  )
}

export function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden p-3 bg-page/90 backdrop-blur border-t border-ink/5 flex gap-2">
      <a href={site.phoneMainHref} className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-white font-medium py-3.5 rounded-full"><Phone className="w-4 h-4" /> Позвонить</a>
      <a href={site.whatsapp} target="_blank" rel="noopener" className="flex-1 inline-flex items-center justify-center gap-2 bg-aqua text-white font-medium py-3.5 rounded-full"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
    </div>
  )
}
