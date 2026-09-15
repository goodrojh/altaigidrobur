# АлтайГидроБур — лендинг

Премиальный одностраничный сайт компании по бурению скважин на воду (Барнаул, Алтайский край).
React + TypeScript + Vite + Tailwind CSS v4 + lucide-react.

## Запуск

```bash
npm install
npm run dev
```

## Деплой на GitHub Pages

```bash
npm run deploy
```

## Где что менять

- `src/data/site.ts` — контакты, услуги, техника, этапы, работы, FAQ, география.
- `src/data/pricing.ts` — **цены калькулятора** (сейчас ориентировочные по рынку, подставьте свои).
- `public/media/` — фото и видео (hero.mp4, aerial.mp4 — сгенерированы, `works/` — реальные объекты).
- `vite.config.ts` — `base` должен совпадать с именем репозитория.

## Заявки

Форма формирует сообщение и открывает WhatsApp (номер из `site.whatsapp`). Чтобы заявки уходили на почту/в Telegram-бота, подключите бэкенд в `src/components/LeadForm.tsx` (функция `submit`).
