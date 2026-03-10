# Student CRUD App 🎓

A simple student management application built with **React + Vite + TypeScript + Tailwind CSS** for the frontend and **Node.js + Express + TypeScript + Prisma + Zod** for the backend.

## 📁 Project Structure

```
student-crud-app/
├── src/                          # frontend
│   ├── components/
│   │   ├── StudentTable.tsx      # table with edit/delete actions
│   │   ├── StudentForm.tsx       # modal form for add/edit
│   │   ├── ConfirmDialog.tsx     # delete confirmation modal
│   │   └── SearchBar.tsx         # search input component
│   ├── services/
│   │   └── studentApi.ts         # API client + localStorage fallback
│   ├── utils/
│   │   └── exportExcel.ts        # xlsx export helper
│   ├── types/
│   │   └── student.ts            # TypeScript interfaces
│   ├── data/
│   │   └── students.json         # sample data (fallback)
│   ├── App.tsx                   # main app component
│   ├── main.tsx                  # react entry
│   └── index.css                 # tailwind imports
│
├── backend/                      # express api
│   ├── src/
│   │   ├── controllers/
│   │   │   └── studentController.ts
│   │   ├── routes/
│   │   │   └── studentRoutes.ts
│   │   ├── schemas/
│   │   │   └── studentSchema.ts  # zod validation
│   │   ├── types/
│   │   │   └── student.ts
│   │   └── index.ts              # express server
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── tsconfig.json
│   ├── .env.example
│   └── package.json
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## ✨ Features

- View students in a responsive table
- Add new students via modal form
- Edit student records (pre-filled modal)
- Delete with confirmation dialog
- Search/filter by name or email
- Export all or filtered students to Excel
- Simulated loading state
- localStorage persistence (API fallback)
- Zod schema validation on backend
- Full TypeScript support

---

## 🚀 Frontend Setup

```bash
# install dependencies
npm install

# start dev server
npm run dev
```

Opens at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔧 Backend Setup

### Prerequisites
- PostgreSQL installed and running
- Node.js 18+

### Steps

```bash
cd backend
npm install

# copy env file and set your DATABASE_URL
cp .env.example .env

# run migrations
npx prisma migrate dev --name init

# generate prisma client
npx prisma generate

# seed sample data
npm run seed

# start server
npm run dev
```

API runs at `http://localhost:5000`

### API Endpoints

| Method | Endpoint          | Description      |
|--------|-------------------|------------------|
| GET    | /api/students     | Get all students |
| POST   | /api/students     | Create student   |
| PUT    | /api/students/:id | Update student   |
| DELETE | /api/students/:id | Delete student   |

---

## 🌐 Deployment

### Frontend → Vercel

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/student-crud-app.git
git push -u origin main
```

Then go to [vercel.com](https://vercel.com) → New Project → Import → Deploy.

### Backend → Railway / Render

1. Push `backend/` to a repo
2. Connect to Railway/Render
3. Add PostgreSQL addon
4. Set `DATABASE_URL` env var
5. Run `npx prisma migrate deploy`

---

## 🛠 Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, Vite, TypeScript, Tailwind |
| Backend  | Express, TypeScript, Zod            |
| Database | PostgreSQL, Prisma ORM              |
| Export   | xlsx                                |

---

## 📝 License

MIT
