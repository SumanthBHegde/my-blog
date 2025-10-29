<div align="center">

# bhāga (भाग)
### *A little hobby blog — a small share of ideas*

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://sumanthbhegde.github.io/my-blog)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)

[Live Demo](https://sumanthbhegde.github.io/my-blog)

</div>

---

## 📖 About

This is a super-hobby, made-for-fun blog project built to scribble thoughts, tutorials, and random experiments. The codebase is small but honest — a full-stack MERN app with a sprinkle of modern conveniences. If you found this repo, welcome — feel free to poke around, run it locally, or copy bits for your own tinkering.


## ✨ What is this?

A personal hobby blog platform implemented as a full-stack project — a quiet place to publish posts, images, and notes.

**Purpose:** Learn, experiment, and build something fun. Not meant as production-grade SaaS; it's my playground and learning log.

---

## 🚀 Highlights / Features

- 🔐 **Authentication** — User registration, login with JWT
- ✍️ **Rich Editor** — Create/edit/delete blog posts with TipTap editor
- 🖼️ **Image Management** — Upload & crop utilities with Cloudinary integration
- 💬 **Nested Comments** — Basic moderation flow for discussions
- 👥 **User Roles** — Regular users and admin capabilities
- ⚡ **Modern Stack** — React Query for server-state caching, Redux for global state
- 🎨 **Tailwind CSS** — Clean, responsive styling

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React, Redux Toolkit, React Query, React Router, Tailwind CSS, TipTap |
| **Backend** | Node.js, Express.js, Mongoose (MongoDB) |
| **Auth** | JSON Web Tokens (JWT), bcrypt |
| **Storage** | Multer, Cloudinary |
| **Email** | Nodemailer |

---

## 🏃 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/SumanthBHegde/my-blog.git
cd my-blog
```

**2. Backend Setup**

```bash
cd Backend
npm install

# Windows
copy .env.example .env

# macOS/Linux
# cp .env.example .env

# Edit .env with your MongoDB URI, JWT secret, and optional email credentials
npm run dev
```

**3. Frontend Setup** *(new terminal)*

```bash
cd Frontend
npm install
npm start
```

**4. Access the Application**

- Frontend: <http://localhost:3000>
- Backend API: <http://localhost:5000>

---

## 📁 Project Structure

```
my-blog/
├── Backend/          # Express server, controllers, models, middleware
│   ├── config/       # Database & Cloudinary configuration
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth, error handling, rate limiting
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   ├── tests/        # Manual test scripts
│   └── utils/        # Helper functions
│
├── Frontend/         # React application
│   ├── public/       # Static assets
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Route pages
│       ├── services/    # API calls
│       └── store/       # Redux store
```

---

## 💡 Development Notes

- **State Management:** React Query for server data + Redux for user/session state
- **Image Uploads:** Saved locally in `Backend/uploads/` during development; Cloudinary for production
- **Test Scripts:** Helper scripts in `Backend/tests/` for manual verification (Cloudinary, uploads)

---

## 🧪 Running Tests

Small test files under `Backend/tests/` are used for manual verification. Run them selectively during development:

```bash
cd Backend
node tests/test-cloudinary.js
node tests/test-upload-image.js
```

> **Note:** These are not formal test suites — they're manual smoke-check tools.

---

## 🤝 Contributing

This is a hobby project, so contributions are casual and welcome!

- 🐛 **Report issues** — Open an issue if something's broken or confusing
- 🔧 **Submit PRs** — Small fixes, improvements, or style updates are appreciated

**Forking?** Go wild — rename, refactor, rip out what you don't need. Make it yours!

---

## ⚠️ Known Rough Edges

- Not hardened for enterprise-level security — keep secrets out of the repo
- Email and Cloudinary features require external accounts and API keys
- Tests are lightweight manual tools, not CI-grade automated tests

---

## 📄 License

This repo is hobby code. Use it for learning and personal projects. For commercial use of significant parts, please add attribution.

---

## 📬 Contact

**Maintainer:** Sumanth Hegde

- 💼 GitHub: [@SumanthBHegde](https://github.com/SumanthBHegde)
- 🌐 Live Demo: [bhāga blog](https://sumanthbhegde.github.io/my-blog)

For questions or discussions about this project, feel free to open an issue in this repository.

---

<div align="center">

**Thank you for looking at bhāga — may your experiments be messy and instructive.** ✨

</div>

