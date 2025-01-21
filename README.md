# SoftAI

A modern, full-stack application built with .NET 8 and React, with a clean, modular architecture.

## 🌟 Features

- **Authentication & Authorization**
  - Secure user authentication system
  - Protected routes and API endpoints
  - Role-based access control

- **Modern Tech Stack**
  - .NET 8 backend with clean architecture
  - React frontend with TypeScript
  - Feature-based organization
  - Type-safe API integration

## 🚀 Getting Started

### Prerequisites

- .NET 8 SDK
- Node.js (v18+)
- npm or yarn
- SQLite (for development)

### Installation

1. Clone the repository:
```bash
git clone xxx
```

2. Install backend dependencies:
```bash
cd packages/Api
dotnet restore
```

3. Install frontend dependencies:
```bash
cd ../web
npm install
```

4. Seed the database (when application is running):
```bash
curl -X POST http://localhost:5001/api/users/seed
```

5. Default login credentials:
- Email: test@example.com
- Password: Test123!

### Running the Application

1. Start the backend:
```bash
cd packages/Api
dotnet run
```

2. Start the frontend:
```bash
cd packages/web
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

## 🏗️ Architecture

### Backend (.NET)

- Feature-based organization
- Clean architecture principles
- Single project structure
- Comprehensive test coverage
- Type-safe API endpoints

### Frontend (React)

- Feature-based module organization
- Type-safe API integration
- Component-driven development
- State management per feature
- Comprehensive testing

## 📝 API Documentation

API documentation is available at `/swagger` when running in development mode.

## 🧪 Testing

### Backend Tests
```bash
cd packages/Api
dotnet test
```

### Frontend Tests
```bash
cd packages/web
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- All differents AI models who have helped shape this project XD
