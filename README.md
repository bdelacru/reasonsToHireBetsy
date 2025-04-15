# 🎡 Reasons to Hire Betsy

Welcome to **Reasons to Hire Betsy**, a whimsical full-stack app built to showcase Betsy's experience, personality, and technical strengths—all through the fun of a Magic 8-Ball interaction.

![Project Screenshot](./frontend/public/cover-screenshot.png)

🔗 **Live Site**: [https://reasonstohirebetsy.com](https://reasonstohirebetsy.com)  
📘 **Swagger Docs**: [https://reasonstohirebetsy.onrender.com/swagger-ui/index.html](https://reasonstohirebetsy.onrender.com/swagger-ui/index.html)

---

## 🚀 Tech Stack

### Frontend (Vite + React + TypeScript + TailwindCSS)
- Vite for fast builds and hot reloads
- TailwindCSS for sleek utility-based styling
- Responsive, animated 8-ball UI with affirmations
- Magic 8-ball styled cartoon illustration of Betsy and her dogs
- Environment-based API switching (local vs production)

### Backend (Spring Boot)
- Spring Boot with PostgreSQL
- RESTful API that serves a random reason from the DB
- Swagger UI for endpoint testing and demonstration
- Flyway for production-safe DB migrations
- Environment variables for DB credentials and Cloudinary integration

### Deployment
- Frontend: Vercel
- Backend: Render (Java Web Service)

---

## 📂 Features

### Magic 8-Ball Mechanics
- Each time you press "Shake the Magic 8-Ball", an affirmation like *"Yes, yes, YES!"* is shown followed by a professional or personal reason to hire Betsy.
- Reasons come with emoji-coded categories: TECHNICAL, PERSONALITY, SOFT_SKILL, BETSY_ENERGY, and more.

### Developer Showcase
- Swagger UI exposes all backend endpoints
- Flyway migrations ensure clean production upgrades
- Code split into `frontend/` and `backend/` modules

---

## 🪧 Setup & Local Development

### 1. Backend Setup
```bash
cd backend
cp .env.template .env  # populate secrets for DB + Cloudinary
npm install -g env-cmd  # if needed
env-cmd -f .env mvn spring-boot:run
```

### 2. Frontend Setup
```bash
cd frontend
cp .env.local.template .env.local  # set VITE_API_URL=http://localhost:8080
npm install
npm run dev
```

---

## ❌ Common Errors + Workarounds

### Tailwind not working in Vite
- Caused by incorrect PostCSS plugin setup.
```js
// postcss.config.js
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
export default { plugins: [tailwindcss, autoprefixer] };
```

### Spring Boot fails with missing main class
- Fixed by adding `mainClass` to `spring-boot-maven-plugin` in `backend/pom.xml`

### Flyway Errors
- Column already exists → drop the column or increment Flyway version
- No schema history table → add `baselineOnMigrate: true`

### Frontend build fails on Vercel
- Caused by missing image assets or Rollup bug
- Fixed by restoring image paths and reinstalling dependencies

### CORS error
- Resolved via Spring `CorsConfig`:
```java
.allowedOriginPatterns("https://reasons-to-hire-betsy.vercel.app", "http://localhost:5173")
```

### Render: `mvn` not found
- Switched to Docker-based deployment or custom Maven installation

---

## 🧰 What You Can Show Off

- Modern frontend with Vite + Tailwind
- Spring Boot backend with Swagger UI
- Clean API separation using services + repositories
- Flyway database versioning
- Deployment with environment-based configs
- A delightful UX with interactive magic 8-ball vibes

---

## 🥇 Next Steps
- Add observability with Honeycomb
- Admin panel to approve/reject submitted reasons
- Dark mode toggle
- User-submitted reasons

---

## ✨ Final Result
This app is a personal and technical portfolio brought to life. It combines Betsy's story, backend engineering skills, and a joyful user interface to answer:  
**"Is Betsy your next great hire?"** — *Signs point to YES.*

