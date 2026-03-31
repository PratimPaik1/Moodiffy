# 🎧 Moodify – Emotion-Based Music Player  

**Feel your mood. Hear your vibe.**  

Moodify is a full-stack music web application that intelligently plays songs based on user mood.  
It provides a **personalized, dynamic, and immersive music experience** using modern web technologies.

---

## 🚀 Live Demo  
👉 [Open Moodify](https://moodiffy.onrender.com/)

## 📂 GitHub Repository  
👉 [View Source Code](https://github.com/PratimPaik1/Moodiffy)

---

## ✨ Features  

- 🎭 **Emotion-Based Recommendations**  
  Music adapts dynamically based on user mood  

- 🎵 **Custom Music Player**  
  Play, pause, seek & control playback speed  

- 🔐 **Secure Authentication**  
  Login & Register with session management  

- 🔄 **Persistent Login**  
  User stays logged in even after refresh  

- 📦 **REST API Backend**  
  Clean and scalable backend architecture  

- ⚡ **Redis Caching**  
  Faster response time and optimized performance  

- ☁️ **ImageKit Integration**  
  Efficient media storage and delivery  

- 🎬 **Picture-in-Picture (PiP)**  
  Continue music while multitasking  

---

## 🛠️ Tech Stack  

### 🎨 Frontend  
- React.js  
- SCSS  
- Axios  

### ⚙️ Backend  
- Node.js  
- Express.js  

### 🗄️ Database & Services  
- MongoDB  
- Redis  
- ImageKit  

---

## 🔐 Authentication Flow  

- Cookie / JWT-based authentication  
- Secure session handling  
- Protected routes for authorized users  
- Refresh-safe login system  

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/PratimPaik1/Moodiffy.git
cd Moodiffy


2️⃣ Install Dependencies
Backend
cd Backend
npm install
Frontend
cd frontend
npm install
3️⃣ Environment Variables

Create a .env file inside Backend folder:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

4️⃣ Run the Application
Backend
npm run dev
Frontend
npm run dev
🚀 Deployment
🌐 Backend: Render
🎨 Frontend: (Add Vercel / Netlify if deployed)
🧠 Future Enhancements
🎶 Playlist & Queue System
🔁 Shuffle & Repeat Mode
📱 Fully Responsive Mobile UI
🤖 AI-Based Emotion Detection
👨‍💻 Author

Pratim Paik
🔗 GitHub Profile

⭐ Support

If you like this project:
👉 Give it a ⭐ on GitHub
