import { useEffect, useRef } from 'react'

// Фоновое видео, которое гарантированно автозапускается на мобильных.
// React не пишет атрибут `muted` в DOM, поэтому iOS/Android считают видео
// «со звуком» и блокируют autoplay, показывая значок play. Здесь мы выставляем
// атрибуты руками, запускаем play() при появлении в кадре и при первом касании.
export function BgVideo({ src, poster, className = '' }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')

    const tryPlay = () => {
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => { /* повторим по событию ниже */ })
    }

    // Играем только когда видео в кадре — экономит батарею и трафик.
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) tryPlay(); else v.pause()
    }, { threshold: 0.05 })
    io.observe(v)

    // Если браузер заблокировал autoplay — запускаем при первом взаимодействии.
    const events = ['touchstart', 'touchend', 'scroll', 'click', 'keydown'] as const
    const onInteract = () => { if (v.paused) tryPlay() }
    events.forEach(e => window.addEventListener(e, onInteract, { passive: true }))
    const onVisible = () => { if (document.visibilityState === 'visible' && v.paused) tryPlay() }
    document.addEventListener('visibilitychange', onVisible)
    v.addEventListener('loadeddata', tryPlay)
    v.addEventListener('canplay', tryPlay)

    return () => {
      io.disconnect()
      events.forEach(e => window.removeEventListener(e, onInteract))
      document.removeEventListener('visibilitychange', onVisible)
      v.removeEventListener('loadeddata', tryPlay)
      v.removeEventListener('canplay', tryPlay)
    }
  }, [src])

  return (
    <video
      ref={ref}
      className={`bg-video ${className}`}
      autoPlay muted loop playsInline
      preload="auto"
      poster={poster}
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
