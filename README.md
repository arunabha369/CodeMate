# CodeMate 🚀

> **Swipe. Match. Code.**  
> The ultimate matchmaking platform for developers to find their perfect coding partner, hackathon teammate, or open-source collaborator.


## 📖 Overview

**CodeMate** is a MERN-stack application that gamifies networking for developers. Think "Tinder for Devs" but with a professional twist. Users can create detailed profiles, showcase their tech stack (verified via GitHub), and verify their professional identity via LinkedIn.

Our smart algorithm suggests connections based on shared skills and interests, helping you build your dream team in seconds.

---

## ✨ Key Features

### 🔍 **Smart Matchmaking**
- **Swipe Interface**: Familiar Tinder-style card stack to browse developers.
- **Skill-Based Algorithm**: Recommended matches based on tech stack compatibility.
- **Premium User Priority**: Verified professionals get boosted visibility.

### 👤 **Rich User Profiles**
- **Profile Customization**: Add bio, skills, age, and gender.
- **Dark Mode UI**: Sleek, developer-friendly dark aesthetic with glassmorphism effects.
- **Social Integrations**:
  - **GitHub**: Link your account to automatically analyze repositories and display top languages.
  - **LinkedIn**: Verify your identity to earn a "Verified Pro" badge and 3x more feed visibility.

### 💬 **Real-Time Collaboration**
- **Instant Messaging**: Chat with your matches in real-time (powered by Socket.io).
- **Request Management**: Send, accept, or ignore connection requests.

---

## 🛠️ Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Redux Toolkit, Tailwind CSS, DaisyUI |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Authentication** | JWT (HttpOnly Cookies), Passport.js (GitHub/LinkedIn OAuth) |
| **Real-time** | Socket.io |
| **Deployment** | AWS / Vercel (Ready) |

---

## � Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account
- GitHub & LinkedIn Developer Apps (for social auth)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/codemate.git
cd codemate
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Copy `server/.env.example` to `server/.env` and fill in your values:
```env
# Server Configuration
PORT=7778
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication (required in production)
JWT_SECRET=your_long_random_secret

# Frontend URL (OAuth redirects + allowed CORS/socket origin)
CLIENT_URL=http://localhost:5173

# Social Integrations
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```

> **Deploying?** Set `NODE_ENV=production`, a long random `JWT_SECRET`, `CLIENT_URL` to your live frontend URL,
> and each `*_CALLBACK_URL` to your live API (e.g. `https://api.example.com/auth/github/callback`).
> On the frontend, set `VITE_API_URL` to your live API URL.

Start the backend server:
```bash
npm run dev
```
> Server runs on: `http://localhost:7778`

### 3. Frontend Setup
Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```

Start the frontend development server:
```bash
npm run dev
```
> Client runs on: `http://localhost:5173`

---

## 🔌 API Reference

### Auth & Profile
- `POST /signup` - Register a new user
- `POST /login` - Login with email/password
- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/linkedin` - Initiate LinkedIn OAuth
- `GET /profile/view` - Get current user profile
- `PATCH /profile/edit` - Update profile details

### Matchmaking
- `GET /feed` - Get potential matches (swiping deck)
- `POST /request/send/:status/:userId` - Send Interest/Ignore request
- `POST /request/review/:status/:requestId` - Accept/Reject connection request

---

## 🔮 Roadmap

- [x] Social Logins (GitHub, LinkedIn)
- [x] Premium "Verified" Badge
- [ ] Subscription Model (CodeMate Gold)
- [ ] Project Showcase Section
- [ ] Team Formation for Hackathons

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
