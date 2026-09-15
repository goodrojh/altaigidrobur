import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { LogoIcon, scrollTo } from './ui'
import { site } from '../data/site'

const links = [
  { id: 'services', label: 'Услуги' },
  { id: 'well', label: 'Скважина' },
  { id: 'rigs', label: 'Техника' },
  { id: 'calc', label: 'Калькулятор' },
  { id: 'works', label: 'Работы' },
  { id: 'faq', label: 'Вопросы' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (id: string) => { setOpen(false); scrollTo(id) }

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 py-4 sm:py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 text-ink" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <LogoIcon className="w-7 h-7 text-deep" />
          <span className="text-xl sm:text-2xl font-medium tracking-tight">{site.name}</span>
        </a>

        <div className="hidden xl:flex items-center gap-8">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">{l.label}</button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href={site.phoneMainHref} className="hidden lg:inline-flex items-center gap-2 text-base font-medium text-ink hover:text-deep transition-colors whitespace-nowrap">
            <Phone className="w-4 h-4" /> {site.phoneMain}
          </a>
          <button onClick={() => go('lead')} className="hidden sm:inline-flex whitespace-nowrap bg-ink text-white text-base font-medium px-7 py-2.5 rounded-full hover:bg-deep transition-colors duration-200">
            Оставить заявку
          </button>
          <button aria-label="Меню" onClick={() => setOpen(true)} className="xl:hidden w-11 h-11 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-ink">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-page flex flex-col p-6">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-ink"><LogoIcon className="w-7 h-7 text-deep" /><span className="text-xl font-medium">{site.name}</span></span>
            <button aria-label="Закрыть" onClick={() => setOpen(false)} className="w-11 h-11 rounded-full bg-white flex items-center justify-center"><X className="w-5 h-5" /></button>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)} className="text-left text-3xl font-medium text-ink" style={{ letterSpacing: '-0.02em' }}>{l.label}</button>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3">
            <a href={site.phoneMainHref} className="text-2xl font-medium text-ink">{site.phoneMain}</a>
            <a href={site.phoneCityHref} className="text-lg text-ink/70">{site.phoneCity}</a>
            <button onClick={() => go('lead')} className="mt-3 bg-ink text-white text-base font-medium px-7 py-3.5 rounded-full">Оставить заявку</button>
          </div>
        </div>
      )}
    </nav>
  )
}
