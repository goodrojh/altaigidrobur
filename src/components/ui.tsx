import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

// Стилизованная капля-скважина: капля с кольцом обсадной трубы.
export function LogoIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
      <path d="M128 12c-38 52-84 100-84 152a84 84 0 0 0 168 0c0-52-46-100-84-152zm0 52c22 30 44 58 44 100a44 44 0 0 1-88 0c0-42 22-70 44-100z" />
      <rect x="116" y="150" width="24" height="94" rx="6" />
    </svg>
  )
}

export function PillButton({
  children, href, onClick, tone = 'ink', size = 'md', className = '', type,
}: {
  children: ReactNode; href?: string; onClick?: () => void; tone?: 'ink' | 'white' | 'aqua'; size?: 'md' | 'lg'; className?: string; type?: 'button' | 'submit'
}) {
  const base = 'group inline-flex items-center gap-3 font-medium rounded-full transition-colors duration-200 select-none'
  const tones = {
    ink: 'bg-ink text-white hover:bg-deep',
    aqua: 'bg-aqua text-white hover:bg-deep',
    white: 'bg-white text-ink hover:bg-aqua-light',
  }[tone]
  const sizes = size === 'lg' ? 'text-base md:text-lg pl-8 pr-2 py-2' : 'text-base pl-7 pr-2 py-1.5'
  const circle = tone === 'white' ? 'bg-ink text-white' : 'bg-white text-ink'
  const cls = `${base} ${tones} ${sizes} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      <span className={`${circle} rounded-full p-2 transition-transform duration-200 group-hover:translate-x-0.5`}>
        <ArrowRight className="w-5 h-5" />
      </span>
    </>
  )
  if (href) return <a href={href} className={cls} onClick={onClick}>{inner}</a>
  return <button type={type ?? 'button'} className={cls} onClick={onClick}>{inner}</button>
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-ink/60 text-sm mb-2 tracking-wide">{children}</p>
}

export const H2 = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h2 className={`text-ink text-4xl md:text-5xl font-medium leading-[1.05] ${className}`} style={{ letterSpacing: '-0.03em' }}>{children}</h2>
)

export const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
