# AI based Lab Companion 🚀

- A comprehensive platform designed to empower educators and students with advanced tools for managing programming labs, tracking progress, and fostering collaborative learning experiences with AI-powered assistance.

## ✨ Features

### 🎓 Student Features

- **Interactive Code Editor**: Monaco-based code editor with syntax highlighting for multiple programming languages (C, C++, Python, Java)
- **AI-Powered Hints**: Get intelligent hints and guidance when stuck on problems
- **Progress Tracking**: Monitor your learning journey with detailed progress analytics
- **Lab Enrollment**: Browse and enroll in available programming labs
- **Submission History**: Track all your code submissions and solutions
- **Quiz Generation**: AI-generated quizzes based on problem descriptions for interview preparation

### 👨‍🏫 Teacher Features

- **Lab Creation & Management**: Create comprehensive programming labs with custom problems
- **Student Performance Analytics**: Visual dashboards showing student progress and engagement
- **Enrollment Management**: Approve/reject student enrollment requests
- **Question Management**: Create, update, and delete lab questions with expected inputs/outputs
- **Real-time Monitoring**: Track student submissions and performance in real-time

### 👨‍💼 Admin Features

- **User Management**: Complete user administration with role-based access control
- **Role Assignment**: Change user roles (Student, Teacher, Admin)
- **System Overview**: Monitor overall platform usage and statistics

### 🤖 AI-Powered Features

- **Intelligent Code Hints**: Context-aware hints powered by Google Gemini AI
- **Automated Quiz Generation**: Generate interview-style quizzes from problem descriptions
- **Smart Code Analysis**: AI analyzes student code to provide targeted guidance

### 🔐 Security & Authentication

- **JWT-based Authentication**: Secure token-based authentication system
- **Role-based Access Control**: Granular permissions based on user roles
- **Secure Password Storage**: BCrypt password hashing
- **CORS Protection**: Configured for secure cross-origin requests

### 📊 Analytics & Reporting

- **Visual Progress Tracking**: Charts and graphs showing student performance
- **Submission Analytics**: Detailed analysis of code submissions
- **Engagement Metrics**: Track student engagement and activity

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.10 or higher)
- MongoDB database
- Google AI API key (for AI features)

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-lab
```

#### 2. Setup Environment Variables

Create `.env` files in both server directories:

**Server (.env)**:

```env
SECRET_KEY=your_jwt_secret_key
MONGODB_CONNECTION_STRING=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PYTHON_BACKEND_URL=http://localhost:8000
```

**Python Server (.env)**:

```env
SECRET_KEY=your_jwt_secret_key
GOOGLE_API_KEY=your_google_ai_api_key
MONGODB_CONNECTION_STRING=your_mongodb_connection_string
```

#### 3. Install Dependencies

**Frontend (Client)**:

```bash
cd client
npm install
```

**Backend (Node.js Server)**:

```bash
cd server
npm install
```

**AI Backend (Python Server)**:

```bash
cd python-server
pip install -r requirements.txt
```

#### 4. Start the Servers

**Start Python AI Server**:

```bash
cd python-server
python main.py
# Server runs on http://localhost:8000
```

**Start Node.js Backend**:

```bash
cd server
npm run dev
# Server runs on http://localhost:5050
```

**Start Frontend**:

```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

### 🔗 Access the Application

- **Frontend**: http://localhost:5173
- **Node.js API**: http://localhost:5050
- **Python AI API**: http://localhost:8000

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/v1/auth/signup

Create a new user account

- **Body**: `{ email, password, name, role? }`
- **Response**: `{ accessToken }`

#### POST /api/v1/auth/login

User login

- **Body**: `{ email, password }`
- **Response**: `{ accessToken, user }`

#### POST /api/v1/auth/verify

Verify JWT token

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ user }`

#### POST /api/v1/auth/logout

User logout

- **Response**: `{ message }`

#### GET /api/v1/auth/all-users

Get all users (Admin only)

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `[{ users }]`

#### POST /api/v1/auth/change-role

Change user role (Admin only)

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ userId, newRole }`
- **Response**: `{ updatedUser }`

### Lab Management Endpoints

#### POST /api/v1/lab/create

Create a new lab (Teacher/Admin only)

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ title, description, sec, subject }`
- **Response**: `{ lab }`

#### GET /api/v1/lab/

Get lab details by creator

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ lab }`

#### POST /api/v1/lab/enroll

Request enrollment in a lab

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ labcode }`
- **Response**: `{ enrollment }`

#### PUT /api/v1/lab/enrollment/change

Change enrollment status (Teacher/Admin only)

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ enrollmentId, status }`
- **Response**: `{ updatedEnrollment }`

#### GET /api/v1/lab/enrollments

Get all enrollment requests (Teacher/Admin only)

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `[{ enrollments }]`

#### GET /api/v1/lab/enrolled

Get enrolled labs for student

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `[{ labs }]`

#### GET /api/v1/lab/all

Get all available labs

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `[{ labs }]`

#### GET /api/v1/lab/created

Get labs created by teacher

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `[{ labs }]`

### Questions Management Endpoints

#### POST /api/v1/questions/create

Create a new question (Teacher/Admin only)

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ title, description, labId, exInput, exOutput }`
- **Response**: `{ question }`

#### PUT /api/v1/questions/update/:id

Update a question (Teacher/Admin only)

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ title, description, exInput, exOutput }`
- **Response**: `{ updatedQuestion }`

#### DELETE /api/v1/questions/delete/:id

Delete a question (Teacher/Admin only)

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ message }`

#### GET /api/v1/questions/lab/:labId

Get questions for a specific lab

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `[{ questions }]`

#### POST /api/v1/questions/solve

Submit solution for a question

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ questionId, code, language }`
- **Response**: `{ submission }`

#### GET /api/v1/questions/submissions/:questionId

Get submission history for a question

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `[{ submissions }]`

#### GET /api/v1/questions/:id

Get question by ID

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ question }`

### Code Compilation Endpoints

#### POST /api/v1/compiler/compile

Compile and execute code

- **Body**: `{ code, language, input? }`
- **Response**: `{ output, stderr, stdout, exitCode }`
- **Supported Languages**: c, cpp, python, java

#### POST /api/v1/compiler/hints

Get AI-powered hints for code

- **Body**: `{ question, code }`
- **Response**: `{ hints: [string] }`

#### POST /api/v1/compiler/quiz

Generate quiz based on problem (Authenticated)

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ question }`
- **Response**: `{ quiz }`

#### GET /api/v1/compiler/quiz

Fetch generated quiz (Authenticated)

- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ quiz }`

### AI Tutor Endpoints (Python Server)

#### POST /api/v1/aitutor/generate/hints

Generate AI-powered hints

- **Body**: `{ question: string, code: string }`
- **Response**: `{ hints: [string] }`

#### POST /api/v1/aitutor/generatequiz

Generate interview preparation quiz

- **Body**: `{ question: string }`
- **Response**: `{ testName, testDescription, totalQuestions, questions, difficulty }`

## 🛠️ Technology Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Radix UI** components
- **Monaco Editor** for code editing
- **React Router** for navigation
- **Redux Toolkit** for state management
- **Axios** for API calls
- **React Query** for data fetching

### Backend (Node.js)

- **Express.js** with TypeScript
- **MongoDB** with Mongoose
- **JWT** for authentication
- **BCrypt** for password hashing
- **CORS** for cross-origin requests

### AI Backend (Python)

- **FastAPI** framework
- **LangChain** for AI orchestration
- **Google Generative AI** (Gemini)
- **Pydantic** for data validation
- **Uvicorn** ASGI server

### Deployment

- **Vercel** (Frontend)
- **Render** (Backend services)
- **MongoDB Atlas** (Database)

## 📦 Project Structure

```
ai-lab/
├── client/                 # React frontend
├── server/                 # Node.js backend
├── python-server/          # Python AI backend
└── readme.md               # Project documentation
```
