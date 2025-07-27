# AlgoPath 🚀

**Your Ultimate Coding Practice Platform**

AlgoPath is a modern, full-stack web application designed to help developers master algorithmic thinking and coding skills through interactive problem-solving and real-time code execution.

![AlgoPath Banner](https://via.placeholder.com/800x400/1f2937/ffffff?text=AlgoPath+-+Master+Your+Coding+Skills)

## ✨ Features

### 🔐 **Secure User Authentication**

- Email/password registration and login
- Session management with NextAuth.js
- Secure password hashing with bcrypt
- Protected routes and user profiles

### 📊 **Interactive Problem Dashboard**

- Browse coding problems by difficulty (Easy, Medium, Hard)
- Track your progress with solved problem indicators
- Dynamic status badges showing completion status
- Search and filter problems by categories

### 💻 **Advanced Code Editor**

- Multi-language support (Python, JavaScript, Java, C++)
- Syntax highlighting with CodeMirror
- Multiple themes (Dark, Light, VS Code)
- Adjustable font sizes
- Auto-completion and bracket matching

### ⚡ **Real-time Code Execution**

- Instant code compilation and execution
- JDoodle API integration for reliable testing
- Custom input testing capabilities
- Detailed output with runtime and memory usage

### 🏆 **Online Judge System**

- Automated test case validation
- Real-time feedback on code submissions
- Acceptance/rejection status with detailed results
- Performance metrics and optimization hints

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **CodeMirror** - Advanced code editor
- **React Icons** - Beautiful icon library

### Backend

- **Next.js API Routes** - Serverless backend functions
- **MongoDB** - NoSQL database with Mongoose ODM
- **NextAuth.js** - Authentication library
- **JDoodle API** - Code execution service

### Development Tools

- **ESLint** - Code linting and formatting
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS processing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB database
- JDoodle API key (from RapidAPI)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YathishGP003/AlgoPath.git
   cd algopath
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your credentials:

   ```env
   # Database
   MONGO_URL=mongodb://localhost:27017/algopath

   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key_here

   # Code Execution API
   NEXT_PUBLIC_RAPID_API_KEY=your_rapidapi_key
   NEXT_PUBLIC_RAPID_API_HOST=jdoodle2.p.rapidapi.com
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
algopath/
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes
│   ├── login/            # Authentication pages
│   ├── problems/         # Problem pages
│   └── layout.js         # Root layout
├── components/           # React components
│   ├── shared/           # Reusable components
│   └── workspace/        # Code editor components
├── models/               # MongoDB schemas
├── utils/                # Utility functions
├── public/               # Static assets
└── constants/            # App constants
```

## 🔧 API Endpoints

### Authentication

- `POST /api/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Problems

- `GET /api/getAllProblems` - Fetch all problems
- `GET /api/getProblembyId` - Get specific problem
- `POST /api/submitCode` - Submit code for execution

### User Management

- `GET /api/getUserInfo` - Get user profile and progress

## 🎯 Usage Guide

### For Students

1. **Sign up** for a free account
2. **Browse problems** on the dashboard
3. **Select a problem** to start coding
4. **Write your solution** in the integrated editor
5. **Test with custom inputs** before submission
6. **Submit your code** for automated testing
7. **Track your progress** and improve your skills

### For Educators

- Use AlgoPath to assign coding problems
- Monitor student progress through the dashboard
- Create custom problem sets for your curriculum

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **JDoodle** for providing the code execution API
- **Next.js team** for the amazing framework
- **MongoDB** for the reliable database solution
- **Tailwind CSS** for the beautiful styling system
