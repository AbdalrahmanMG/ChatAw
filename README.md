# 🚀 Real-Time Chat Application  
A modern full-stack real-time messaging platform featuring instant communication, authentication, file sharing, presence indicators, and a clean responsive UI. Built with a scalable architecture and powered by cutting-edge web technologies.

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Architecture](#%EF%B8%8F-architecture)
- [Screenshots](#%EF%B8%8F-screenshots)
- [Folder Structure](#-folder-structure)
- [Installation](#%EF%B8%8F-installation)
  - [Backend Setup](#-backend-setup)
  - [Frontend Setup](#-frontend-setup)
- [API Endpoints](#-api-endpoints)
- [Future Improvements](#-future-improvements)

---

## 📖 Overview
A full-stack chat application built for real-time messaging using **Socket.IO**, with secure **JWT authentication**, **file uploads**, **dark/light theme**, and a fully responsive UI. Designed for performance, scalability, and a smooth messaging experience.

Client and server communicate seamlessly via REST APIs and WebSockets.

---

## ✨ Features

### 🔐 Authentication & Security
- User registration & login  
- JWT-based authentication (secure cookies)  
- Protected API routes  
- Password hashing via bcrypt  
- Route guards on frontend  

### 💬 Real-Time Messaging
- Instant message delivery  
- Real-time sync across clients  
- Typing indicators  
- Online/offline user status  
- Read receipts  
- Persistent message history  

### 👥 User & Chat Management
- Profile management  
- Contact list  
- Chat list & presence tracking  
- User search  
- Dynamic chat creation  

### 📁 Media & File Support
- Image uploads with Cloudinary  
- File attachments  
- Emoji picker  
- Rich media messages  

### 🎨 User Experience
- Fully responsive UI  
- Dark/Light theme toggle  
- Smooth animations  
- Mobile-friendly layouts  
- Real-time notifications  

### 🔄 Real-Time Features
- Live chat creation  
- Typing indicators in chat header + sidebar  
- Online/offline presence tracking  
- Last message sync  

---

## 🛠️ Tech Stack

### **Backend**
| Category | Tech |
|---------|------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + Passport.js |
| Realtime | Socket.IO |
| File Storage | Cloudinary |
| Security | bcryptjs |
| Env Mgmt | dotenv |

### **Frontend**
| Category | Tech |
|---------|------|
| Framework | React |
| Styling | TailwindCSS + shadcn/ui |
| State Management | Zustand |
| Realtime | Socket.IO Client |
| Routing | React Router |
| UI | Custom components + themes |
| Emoji Support | Emoji library |

---

## 🏗️ Architecture
Client (React + Socket.IO Client)
       ↕  WebSockets / HTTP
Server (Express + Socket.IO + JWT)
       ↕
Database (MongoDB)

       ↕ (Media uploads)
Cloudinary Storage

--- 

### **Key Patterns**
- RESTful API architecture  
- WebSocket (Socket.IO) for real-time messaging  
- JWT authentication middleware  
- Component-based frontend  
- Centralized Zustard store  

---

## 🖼️ Screenshots
_Add your application screenshots here._

- Login & Signup pages
  <img width="1915" height="889" alt="image" src="https://github.com/user-attachments/assets/cc132021-de6b-41d1-8ab4-ca14c25340f6" />
  <img width="1919" height="888" alt="image" src="https://github.com/user-attachments/assets/f816728b-b2dd-48bd-a489-1d1b2e52e628" />

- Chat interface with message bubbles
  <img width="1914" height="884" alt="image" src="https://github.com/user-attachments/assets/886bc3ea-128c-480d-8d11-c9090d67734b" />
  
- Contact list & user presence
  <img width="1920" height="888" alt="image" src="https://github.com/user-attachments/assets/7183ff3c-6b1a-45f7-8586-01acaad3c320" />
  
- Dark/Light themes
  <img width="1915" height="891" alt="image" src="https://github.com/user-attachments/assets/c5a843b0-4de0-431e-867c-3eff707c6c28" />
  <img width="1918" height="885" alt="image" src="https://github.com/user-attachments/assets/f7fbdad4-3f78-41ee-a1ef-5dae8d608146" />

- Mobile responsive views
  <img width="348" height="776" alt="image" src="https://github.com/user-attachments/assets/b34d4aae-b199-4bad-bc3d-9d64fd408c13" />
  <img width="346" height="773" alt="image" src="https://github.com/user-attachments/assets/b922e8b2-6165-42d9-9de8-838bbc5976cf" />
  <img width="349" height="771" alt="image" src="https://github.com/user-attachments/assets/8ead272a-9fff-48a6-8d0b-de626be5aa6d" />

---

## 📂 Folder Structure
```bash
project/
├── server/
│ ├── controllers/ # Route handlers
│ ├── models/ # MongoDB schemas (User, Chat, Message)
│ ├── middleware/ # JWT auth, validation
│ ├── routes/ # API endpoints
│ ├── services/ # Business logic
│ ├── config/ # DB + Cloudinary + environment
│ ├── sockets/ # Socket.IO events
│ └── uploads/ # Upload handling
└── client/
├── components/ # UI components
├── hooks/ # Custom hooks
├── pages/ # Route-level components
├── store/ # Zustand global state
├── types/ # TypeScript definitions
├── utils/ # Helper utilities
└── styles/ # Themes & global styles
```

---

## ⚙️ Installation

### **Prerequisites**
- Node.js v18+  
- MongoDB  
- Cloudinary account  

---

### 🔧 Backend Setup
```bash
cd server
pnpm install
```

### .env.examples
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

### Start server 
```bash
pnpm run dev
```

### 🔧 Frontend Setup
```bash
cd client
pnpm install
```

### Create .env (example):
VITE_API_URL=http://localhost:8000

### Frontend runs on:
👉 http://localhost:5173

---

## 📌 API Endpoints

### Auth 
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET  /api/auth/status

### Chat
- POST /api/chat/create
- POST /api/chat/message/send
- GET /api/chat/all
-GET  /api/chat/:id

### User
- GET /api/chat/all

## 🔮 Future Improvements
### 🚀 Planned Features
- Voice & video calling
- Group chats / channels
- Message reactions & replies
- Document file sharing
- Message search
- Push notifications
- End-to-end encryption
- Chat export
- User avatars

### 🔧 Engineering Enhancements
- Microservice architecture
- Redis caching / session management
- Scaling & load balancing
- PWA support
- Internationalization (i18n)
- Advanced analytics

### 🤝 Contributing

Contributions, ideas, and improvements are welcome.
Please open an issue before submitting a pull request.
