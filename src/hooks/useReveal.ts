import { useEffect, type RefObject } from 'react'

// Adds .is-visible to every .reveal element when it enters the viewport.
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-visible')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
}

export function useCountUp(target: number, ref: RefObject<HTMLElement | null>, duration = 1400) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let done = false
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting || done) return
      done = true
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.round(target * eased).toString()
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, ref, duration])
}
