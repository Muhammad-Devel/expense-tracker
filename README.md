# Xarajatlar Trakeri (MERN Stack)

Kirim va chiqimlarni yuritish, kunlik/oylik/yillik xarajatlar tahlilini ko'rish uchun mobilga moslashgan to'liq stack ilova. Har bir foydalanuvchi email + parol orqali ro'yxatdan o'tadi va faqat o'z yozuvlarini ko'radi.

**Stack:** MongoDB · Express · React (Vite) · Node.js · JWT autentifikatsiya

## Imkoniyatlari

- **Email + parol orqali ro'yxatdan o'tish va kirish (JWT)** — har bir foydalanuvchi faqat o'z ma'lumotlarini ko'radi
- Istalgan vaqt kirim yoki chiqim qo'shish (summa, kategoriya, sana, izoh)
- Bosh sahifada umumiy balans, jami kirim/chiqim va so'nggi yozuvlar
- Tahlil sahifasida **kunlik / oylik / yillik** grafik (ustunli diagramma)
- Kategoriyalar bo'yicha chiqimlar taqsimoti (progress-bar ko'rinishida)
- Yozuvni bosib turib o'chirish
- Mobil ekranga moslashtirilgan interfeys (pastki navigatsiya + "+" tugmasi)
- **PWA** — telefon ekraniga "ilova" sifatida o'rnatish imkoniyati
- Bepul hosting'larning "uxlab qolish" muammosiga chidamli (avtomatik qayta urinish + tushunarli xabar)

## Loyiha tuzilishi

```
expense-tracker/
├── backend/     → Express API + MongoDB (Mongoose) + JWT auth
└── frontend/    → React (Vite) ilovasi, PWA
```

## O'rnatish va lokal ishga tushirish

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

`.env` faylini oching va quyidagilarni to'ldiring:
- `MONGO_URI` — MongoDB Atlas manzilingiz (yoki lokal MongoDB)
- `JWT_SECRET` — uzun, tasodifiy matn. Generatsiya qilish uchun:
  ```bash
  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
  ```

Keyin ishga tushiring:

```bash
npm run dev
```

Backend `http://localhost:5000` portida ishga tushadi.

### 2. Frontend

Yangi terminal oynasida:

```bash
cd frontend
npm install
npm run dev
```

Frontend `http://localhost:5173` portida ishga tushadi. `/api` so'rovlari `vite.config.js` dagi proxy orqali avtomatik backendga (5000-port) yo'naltiriladi — lokalda `VITE_API_URL` kerak emas.

Brauzerda `http://localhost:5173` manzilini oching — DevTools'da mobil rejimni yoqib ko'rish tavsiya etiladi.

## Production'ga deploy qilish (Vercel + Render)

### Backend — Render

1. Render'da yangi **Web Service** yarating, GitHub repo'ni ulang, root directory'ni `backend` deb belgilang
2. **Environment** bo'limida quyidagilarni qo'shing:
   - `MONGO_URI` — MongoDB Atlas manzilingiz
   - `JWT_SECRET` — uzun, tasodifiy matn
   - `FRONTEND_URL` — Vercel domeningiz (masalan `https://expense-tracker.vercel.app`) — CORS uchun kerak
3. MongoDB Atlas'da **Network Access** bo'limiga `0.0.0.0/0` qo'shilganini tekshiring (Render'ning IP manzili doim o'zgarib turadi)

### Frontend — Vercel

1. Vercel'da yangi loyiha yarating, GitHub repo'ni ulang, root directory'ni `frontend` deb belgilang
2. **Settings → Environment Variables**'da qo'shing:
   - `VITE_API_URL` — Render backend manzilingiz + `/api`, masalan `https://expense-tracker-backend.onrender.com/api`
3. Deploy qiling

**MUHIM:** `VITE_API_URL`ni keyinroq qo'shsangiz yoki o'zgartirsangiz, Vercel avtomatik qayta build qilmaydi — **Deployments → ⋮ → Redeploy** qilish shart.

## API endpointlari

| Metod  | Manzil                              | Vazifasi                                  |
|--------|--------------------------------------|--------------------------------------------|
| POST   | `/api/auth/register`                 | Ro'yxatdan o'tish (email, password)        |
| POST   | `/api/auth/login`                    | Kirish (email, password) → token           |
| GET    | `/api/auth/me`                       | Joriy foydalanuvchi (token talab qiladi)   |
| GET    | `/api/transactions`                  | Barcha yozuvlar (filter: type, from, to, limit) — **token talab qiladi** |
| GET    | `/api/transactions/:id`              | Bitta yozuv — **token talab qiladi**       |
| POST   | `/api/transactions`                  | Yangi kirim/chiqim qo'shish — **token talab qiladi** |
| PUT    | `/api/transactions/:id`              | Yozuvni tahrirlash — **token talab qiladi** |
| DELETE | `/api/transactions/:id`              | Yozuvni o'chirish — **token talab qiladi** |
| GET    | `/api/transactions/summary`          | Umumiy kirim, chiqim, balans — **token talab qiladi** |
| GET    | `/api/transactions/analytics?period=daily\|monthly\|yearly` | Davr bo'yicha va kategoriya bo'yicha tahlil — **token talab qiladi** |

Token `/api/auth/login` yoki `/api/auth/register`dan qaytadi va har bir keyingi so'rovda `Authorization: Bearer TOKEN` headerida yuboriladi. Frontendda bu avtomatik amalga oshiriladi.

## Telefonga ilova sifatida o'rnatish (PWA)

**Android (Chrome):**
1. Deploy qilingan saytni Chrome'da oching
2. ⋮ menyu → **"Ilovani o'rnatish"** yoki **"Bosh ekranga qo'shish"**

**iPhone (Safari — faqat Safari):**
1. Saytni Safari'da oching
2. Ulashish tugmasi → **"Bosh ekranga qo'shish"**

## Nosozliklarni bartaraf etish (Troubleshooting)

**"Backend ishlab turganini tekshiring" / sahifa yuklanmayapti:**
- Render Free tarifi 15 daqiqa faolsizlikdan keyin uxlab qoladi — birinchi so'rov 30-50 soniya olishi mumkin. Ilova buni avtomatik kutadi va qayta uradi, shunchaki biroz kuting.
- `VITE_API_URL` Vercel'da to'g'ri sozlanganini va Redeploy qilinganini tekshiring.

**Login/Register sahifasi yangilangandan keyin ham ko'rinmayapti:**
- Bu odatda PWA keshi sabab bo'ladi. Brauzerda: **F12 → Application → Service Workers → Unregister**, so'ng **Application → Storage → Clear site data**, keyin sahifani **Ctrl+Shift+R** bilan qattiq yangilang.

**CORS xatosi ("blocked by CORS policy"):**
- Render'dagi `FRONTEND_URL` environment variable aynan Vercel domeningizga mos kelishini tekshiring (oxirida `/` bo'lmasin).

**MongoDB'ga ulanmayapti:**
- Render Logs'da `MongoDB ulanish xatoligi` qatorini qidiring — odatda `MONGO_URI` noto'g'ri yoki MongoDB Atlas Network Access'da IP cheklangan.

## Keyingi qadamlar (ixtiyoriy kengaytmalar)

- Har bir kategoriya uchun oylik byudjet limiti va ogohlantirish
- Ma'lumotlarni Excel/PDF ko'rinishida eksport qilish
- Parolni tiklash (email orqali)
