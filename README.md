# 🧱 Crown Ceramics — Full Stack Management System

A full stack web application for **Crown Ceramics** with product management, inquiry handling, email automation, and secure admin dashboard.

---

# 📁 Project Structure

```text
crown-ceramics/
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── assets/
│   └── vite.config.js
│
└── backend/                  # FastAPI Backend
    ├── main.py
    ├── database.py
    ├── routers/
    ├── static/
    ├── requirements.txt
    └── .env
```

---

# 🛠️ Tech Stack

## Frontend
- React 18
- Vite 5
- React Router
- Axios

## Backend
- Python 3.10+
- FastAPI
- SQLAlchemy
- SQLite
- PyJWT

---

# 🚀 Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

## `.env`

```ini
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_digit_app_password
NOTIFY_EMAIL=info@crownceramics.in
```

## Run Backend

```bash
python -m uvicorn main:app --reload
```

Backend URL:
```text
http://localhost:8000
```

Swagger Docs:
```text
http://localhost:8000/docs
```

---

# 💻 Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:
```text
http://localhost:5173
```

---

# 🔐 Admin Panel

Route:
```text
/admin
```

Default Login:
```text
Username: admin
Password: admin123
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products/` | Get products |
| POST | `/api/inquiry/` | Submit inquiry |
| GET | `/api/brochure/download` | Download brochure |
| POST | `/api/admin/login` | Admin login |
| PATCH | `/api/admin/inquiries/{id}/status` | Update status |
| DELETE | `/api/admin/inquiries/{id}` | Delete inquiry |

---

# ✨ Features

- Product showcase
- Inquiry management
- Email notifications
- JWT authentication
- Admin dashboard
- Responsive UI

---

# 📄 License

Developed for **Crown Ceramics Management**.
Developed By **[Vrut Shah](https://github.com/vrutShah)** • All rights reserved.