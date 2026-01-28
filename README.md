<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

# Pastebin Lite

A minimal Pastebin-like web application built with **Next.js**, **Prisma**, and **PostgreSQL (Neon)**.

Users can create text pastes that:

- Expire after a given time (optional)
- Expire after a maximum number of views (optional)
- Are accessible via a unique URL

Live Demo:  
👉 https://pastebin-lite-eight-mu.vercel.app/

---

## 🚀 Features

- Create text pastes
- Optional expiry by **time**
- Optional expiry by **view count**
- Automatic paste expiration handling
- Simple and clean UI
- Server-side validation
- Deployed on **Vercel**
- Database hosted on **Neon (PostgreSQL)**

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **React**
- **Prisma ORM (v6)**
- **PostgreSQL (Neon)**
- **Vercel**

---

## 📂 Project Structure

src/
├─ app/
│ ├─ api/
│ │ └─ pastes/
│ │ ├─ route.ts # Create paste
│ │ └─ [id]/route.ts # Get paste by ID
│ ├─ p/
│ │ └─ [id]/page.tsx # View paste page
│ └─ page.tsx # Home page
└─ lib/
└─ prisma.ts # Prisma client
prisma/
└─ schema.prisma

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://<your-neon-connection-string>
🧪 Running Locally
1️⃣ Clone the repository

git clone https://github.com/SyedNaweed/pastebin-lite.git
cd pastebin-lite

2️⃣ Install dependencies

pnpm install

3️⃣ Generate Prisma client
npx prisma generate

4️⃣ Start the development server

pnpm dev

The app will be available at:
http://localhost:3000

🔗 API Endpoints
Create a paste
POST /api/pastes

Request Body:

{
  "content": "Hello world",
  "expiresIn": 60,
  "maxViews": 3
}
Get a paste
GET /api/pastes/:id

Responses:

200 → Paste content

404 → Paste expired, view limit reached, or not found

👤 Author

Syed Naweed
GitHub: https://github.com/SyedNaweed

```
