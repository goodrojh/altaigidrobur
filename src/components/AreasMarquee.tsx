import { areas } from '../data/site'

const styles = [
  { fontFamily: '"Times New Roman", serif', fontWeight: 400, letterSpacing: '0.02em', fontSize: 15 },
  { fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, letterSpacing: '0.08em', fontSize: 15, textTransform: 'uppercase' as const },
  { fontFamily: 'Impact, sans-serif', fontWeight: 700, letterSpacing: '0.05em', fontSize: 18 },
  { fontFamily: 'Georgia, serif', fontWeight: 600, letterSpacing: '-0.02em', fontSize: 17 },
  { fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, letterSpacing: '-0.01em', fontSize: 15 },
  { fontFamily: 'Verdana, sans-serif', fontWeight: 700, letterSpacing: '0.06em', fontSize: 13, textTransform: 'uppercase' as const },
  { fontFamily: '"Courier New", monospace', fontWeight: 700, letterSpacing: '0.18em', fontSize: 14 },
  { fontFamily: 'Palatino, serif', fontWeight: 500, letterSpacing: '0.03em', fontSize: 15 },
]

export function AreasMarquee() {
  const items = [...areas, ...areas]
  return (
    <section className="bg-page px-4 sm:px-6 py-6">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-center">
        <p className="text-ink/70 text-base leading-relaxed">
          Выезжаем в Барнаул, пригород<br className="hidden md:block" /> и любой район Алтайского края.
        </p>
        <div className="md:col-span-3 overflow-hidden" aria-label="География работ">
          <div className="backers-track">
            {items.map((a, i) => (
              <span key={i} className="mx-10 shrink-0 text-ink/70 whitespace-nowrap" style={styles[i % styles.length]}>{a}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
