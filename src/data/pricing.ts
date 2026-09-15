// ─────────────────────────────────────────────────────────────
//  ЦЕНЫ ДЛЯ КАЛЬКУЛЯТОРА. Ориентировочные значения по рынку Барнаула —
//  на текущем сайте компании цен нет. Подставьте свои цифры здесь.
// ─────────────────────────────────────────────────────────────
export const pricing = {
  // ₽ за метр — зависит от глубины и обсадки
  perMeter: {
    small: 1500,     // до 60 м, малогабаритная установка, нПВХ
    hydraulic: 2200, // 60–80 м, гидравлика, нПВХ
    metal: 2900,     // >80 м, УРБ, металлическая обсадная труба
  },
  // Обустройство (фиксированные позиции)
  setup: {
    adapter: 25000,    // скважинный адаптер + заводка в дом
    caisson: 65000,    // кессон + заводка в дом
    automation: 18000, // гидроаккумулятор, реле, автоматика
  },
  // Акция с текущего сайта
  promo: 'Монтаж насосного оборудования — бесплатно',
}

export type SetupKind = 'none' | 'adapter' | 'caisson'

export function rateFor(depth: number) {
  if (depth <= 60) return { rate: pricing.perMeter.small, rig: 'Малогабаритная установка', casing: 'Труба нПВХ' }
  if (depth <= 80) return { rate: pricing.perMeter.hydraulic, rig: 'Гидравлическая установка', casing: 'Труба нПВХ' }
  return { rate: pricing.perMeter.metal, rig: 'УРБ 2.5А на базе ЗИЛ', casing: 'Металлическая обсадная труба' }
}

export function estimate(depth: number, setup: SetupKind, automation: boolean) {
  const { rate, rig, casing } = rateFor(depth)
  const drilling = depth * rate
  const setupCost = setup === 'adapter' ? pricing.setup.adapter : setup === 'caisson' ? pricing.setup.caisson : 0
  const auto = automation ? pricing.setup.automation : 0
  return { rate, rig, casing, drilling, setupCost, auto, total: drilling + setupCost + auto }
}

export const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽'
