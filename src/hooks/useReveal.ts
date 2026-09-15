import { useEffect, type RefObject } from 'react'

// Adds .is-visible to every .reveal element when it enters the viewport.
// IntersectionObserver alone can miss elements during fast/programmatic scrolls
// (they jump past the viewport in one frame), so a scroll-driven fallback reveals
// anything that is at or above the viewport bottom.
export function useReveal() {
  useEffect(() => {
    const pending = new Set(Array.from(document.querySelectorAll<HTMLElement>('.reveal')))
    const show = (el: HTMLElement) => { el.classList.add('is-visible'); pending.delete(el) }
    if (!('IntersectionObserver' in window)) { pending.forEach(show); return }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { show(en.target as HTMLElement); io.unobserve(en.target) } })
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' })
    pending.forEach(el => io.observe(el))

    let raf = 0
    const sweep = () => {
      raf = 0
      const limit = window.innerHeight - 30
      pending.forEach(el => { if (el.getBoundingClientRect().top < limit) { show(el); io.unobserve(el) } })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(sweep) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    // Safety net: whatever is still hidden after a few seconds gets shown.
    const timer = window.setTimeout(() => { pending.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) show(el) }) }, 1500)
    sweep()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearTimeout(timer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}

export function useCountUp(target: number, ref: RefObject<HTMLElement | null>, duration = 1400) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let done = false
    const run = () => {
      if (done) return
      done = true
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.round(target * eased).toString()
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { run(); io.disconnect() } }, { threshold: 0.3 })
    io.observe(el)
    // Fallback if the element was scrolled past without intersecting.
    const onScroll = () => { if (!done && el.getBoundingClientRect().top < window.innerHeight) { run(); io.disconnect() } }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [target, ref, duration])
}
