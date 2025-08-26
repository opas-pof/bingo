# Bingo Multiplayer Game

เกม Bingo แบบ multiplayer online ที่สร้างด้วย React + Tailwind CSS

## เทคโนโลยีที่ใช้

### Frontend
- React 18
- Tailwind CSS
- Vite
- Socket.io Client

### Backend (แผนการพัฒนา)
- Node.js + Express หรือ Next.js
- Socket.io สำหรับ Real-time Communication
- Database: MongoDB, PostgreSQL หรือ Firebase

### Deployment
- Vercel (Frontend)
- Railway/Heroku/DigitalOcean (Backend)
- MongoDB Atlas/Supabase (Database)

## ขั้นตอนการพัฒนา

### Phase 1: เกม Bingo แบบ Single Player ✅
- [x] สร้างโปรเจค React + Tailwind CSS
- [x] สร้าง UI สำหรับบัตร Bingo
- [x] ระบบสุ่มตัวเลข
- [x] ระบบตรวจสอบการชนะ
- [x] ระบบคะแนน

### Phase 2: ระบบ Authentication
- [ ] หน้า Login/Register
- [ ] ระบบจัดการผู้ใช้
- [ ] Profile ของผู้เล่น
- [ ] JWT Authentication

### Phase 3: Multiplayer System
- [ ] สร้างห้องเกม (Game Rooms)
- [ ] เชื่อมต่อ Socket.io
- [ ] ระบบแจ้งเตือน real-time
- [ ] ระบบเชิญเพื่อน

### Phase 4: Game Logic
- [ ] ระบบเริ่มเกม
- [ ] ระบบสุ่มตัวเลขแบบ real-time
- [ ] ระบบตรวจสอบผู้ชนะ
- [ ] ระบบคะแนน/Leaderboard
- [ ] ระบบ Chat ในเกม

## ทางเลือกการพัฒนา

### ทางเลือก 1: Firebase (ง่ายที่สุด)
```bash
npm install firebase
```
- Firebase Auth สำหรับ login
- Firestore สำหรับเก็บข้อมูล
- Firebase Realtime Database สำหรับ real-time

### ทางเลือก 2: Supabase (ฟรี + ดี)
```bash
npm install @supabase/supabase-js
```
- Supabase Auth
- PostgreSQL database
- Real-time subscriptions

### ทางเลือก 3: Socket.io + Express (ยืดหยุ่นที่สุด)
```bash
npm install socket.io-client
npm install express socket.io cors
```
- ควบคุมได้ทุกอย่าง
- ต้องเขียน backend เอง

## การติดตั้ง

```bash
npm install
```

## การรันโปรเจค

```bash
npm run dev
```

## การ Build

```bash
npm run build
```

## โครงสร้างโปรเจค

```
bingo/
├── src/
│   ├── components/         # React Components
│   │   ├── BingoCard.jsx   # บัตร Bingo
│   │   ├── GameRoom.jsx    # ห้องเกม
│   │   ├── Login.jsx       # หน้า Login
│   │   └── Chat.jsx        # Chat ในเกม
│   ├── hooks/              # Custom Hooks
│   │   ├── useSocket.js    # Socket.io hook
│   │   └── useAuth.js      # Authentication hook
│   ├── services/           # API Services
│   │   ├── auth.js         # Authentication service
│   │   └── game.js         # Game API service
│   ├── utils/              # Utility Functions
│   │   ├── bingoLogic.js   # Logic เกม Bingo
│   │   └── constants.js    # Constants
│   ├── App.jsx             # Component หลัก
│   ├── main.jsx            # Entry point
│   └── index.css           # CSS หลัก
├── public/                 # Static files
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind config
└── postcss.config.js       # PostCSS config
```

## ฟีเจอร์ที่วางแผน

### ฟีเจอร์หลัก
- [ ] เกม Bingo แบบ multiplayer
- [ ] ระบบห้องเกม
- [ ] Real-time updates
- [ ] ระบบคะแนน
- [ ] Leaderboard

### ฟีเจอร์เพิ่มเติม
- [ ] ระบบ Chat
- [ ] ระบบ Avatar
- [ ] ธีมต่างๆ
- [ ] ระบบ Tournament
- [ ] Mobile responsive
