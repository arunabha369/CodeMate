# CodeMate
CodeMate is a MERN-based developer matchmaking platform where programmers connect, collaborate, and code together. Features include swipe-based matching, real-time chat, and GitHub integration.

# 💻 CodeMate — Find Your Code Partner

**CodeMate** is a full-stack developer matchmaking platform — think of it as **Tinder for developers**, where programmers swipe to find collaborators based on their skills, interests, and project goals.

Whether you're looking for a hackathon buddy, open-source partner, or someone who loves the same tech stack — CodeMate helps you find your **code soulmate**.

---

## 🚀 Features

- 👤 Developer Profiles (tech stacks, bio, interests, GitHub link)
- ❤️ Swipe Right/Left to Like or Skip
- 🔁 Mutual Match System
- 💬 Real-time Chat with Matches (Socket.io)
- 🔐 Secure Authentication with JWT
- 🌐 GitHub API Integration (View public repos & profile)
- 🌓 Dark Mode & Responsive UI

---

## 🧰 Tech Stack

| Layer        | Technology              |
|--------------|--------------------------|
| Frontend     | React.js, Tailwind CSS   |
| Backend      | Node.js, Express.js      |
| Database     | MongoDB Atlas            |
| Real-time    | Socket.io                |
| Auth         | JWT, bcrypt              |
| Deployment   | Vercel (Frontend), Render (Backend) |

---

## 📸 Screenshots

*Coming Soon*

<!--
Add screenshots when your UI is ready:
- Profile creation
- Swipe screen
- Match popup
- Chat screen
-->

---

## 📦 Installation & Setup

### 🔧 Prerequisites

- Node.js & npm
- MongoDB Atlas account
- GitHub Developer account (for GitHub API integration)

### 🔌 Backend Setup

```bash
cd backend
npm install
# Create a `.env` file with:
# PORT=5000
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_secret_key
npm run dev
