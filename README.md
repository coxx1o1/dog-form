# Form Project - Contact Management System

## Project Overview
A full-stack web application that allows users to submit contact forms and enables admins to view and manage all submitted messages.

## Application Flow

**User Journey:**
1. User visits the **Home page** → Fills out the **ContactForm** → Submits data
2. Frontend sends request to **Backend API** → Server processes and saves to **Database**
3. Admin visits **Admin page** → Views all messages in **MessageTable**

---

## Project Structure

```
form/
├── eslint.config.js               # ESLint configuration for code quality
├── README.md
├── client/                          # 🎨 FRONTEND - React UI Application
│   ├── package.json
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # Tailwind CSS styling config
│   ├── vite.config.js               # Vite bundler configuration
│   ├── public/
│   │ 
│   └── index.html               # HTML entry point
│   └── src/
│       ├── App.css                  # Global styles
│       ├── App.jsx                  # Main App component
│       ├── index.css                # Base styles
│       ├── main.jsx                 # React app initialization
│       ├── components/              # 🧩 Reusable UI Components
│       │   ├── ContactForm.jsx      # Form for submitting messages
│       │   └── MessageTable.jsx     # Display messages in table format
│       ├── pages/                   # 📄 Page Components
│       │   ├── Admin.jsx            # Admin dashboard - view all messages
│       │   └── Home.jsx             # Home page - submit contact form
│       └── services/                # 🔌 API Communication
│           └── api.js               # Backend API calls (fetch/axios)
└── server/                          # ⚙️ BACKEND - Node.js Express Server
    ├── app.js                       # Express app configuration
    ├── package.json
    ├── server.js                    # Server entry point
    ├── controllers/                 # 🎛️ Business Logic
    │   └── messageController.js     # Handle message operations (create, read, update, delete)
    ├── models/                      # 💾 Database Schema
    │   └── message.js               # Message data model
    └── routes/                      # 🛣️ API Endpoints
        └── messageRoutes.js         # Define API routes (GET /messages, POST /messages)
```

---

## Folder Roles & Responsibilities

| Folder | Role | What It Does |
|--------|------|-------------|
| **client/** | Frontend | React application for user interface |
| **client/src/components/** | UI Components | Reusable form and table components |
| **client/src/pages/** | Page Layout | Full page views (Home, Admin) |
| **client/src/services/** | API Bridge | Handles all backend API calls for the client-side |
| **server/** | Backend API | Node.js Express server |
| **server/controllers/** | Request Handlers | Processes business logic and database operations |
| **server/models/** | Data Schema | Defines message structure and database interaction |
| **server/routes/** | URL Endpoints | Maps HTTP requests to controller functions |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (or configure in `server/models/message.js`) |
| **Build Tool** | Vite (client), Node (server) |
| **Styling** | Tailwind CSS + PostCSS |

---

## Setup & Installation

### Prerequisites
- Node.js v16+ and npm (or yarn)
- MongoDB running locally (or Atlas connection string)
- Git

### 1. Clone & Install Dependencies

```bash
# Clone the repository (replace <your-repo-url> with the actual URL)
git clone <your-repo-url>
cd form

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Configure Environment Variables

The server expects a `.env` file at the project `server/` root. Example:

```env
# Server config
PORT=5000
NODE_ENV=development

# Database connection (local or Atlas)
MONGODB_URI=mongodb://localhost:27017/contact-form
```

Notes:
- The server loads environment variables via `dotenv` (imported in `server/server.js`).
- If you prefer, you can set `MONGODB_URI` to a MongoDB Atlas connection string.

The client uses Vite's proxy (see `client/vite.config.js`) so API calls from the dev server use the relative path `/api` and are forwarded to the backend.

### 3. Run Locally

Start the backend and frontend in separate terminals.

**Terminal 1 — Backend:**
```bash
cd server
npm start
# Expected output: "MongoDB connected" and "Server running on port 5000"
```

**Terminal 2 — Frontend (Vite dev server):**
```bash
cd client
npm run dev
# Visit http://localhost:5173
```

---

## API Endpoints

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/messages` | Get all messages |
| `POST` | `/api/messages` | Create a new message |
| `GET` | `/api/messages/:id` | Get a specific message |
| `PUT` | `/api/messages/:id` | Update a message |
| `DELETE` | `/api/messages/:id` | Delete a message |

### Example Request

```bash
# Create a message
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "message": "Hello!"}'
```

### Expected Response

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John",
  "email": "john@example.com",
  "message": "Hello!",
  "createdAt": "YYYY-MM-DDTHH:MM:SSZ"
}
```


## Implementation Notes

- The backend loads `.env` using `dotenv` (see `server/server.js` which imports `dotenv/config.js`).
- The Admin UI uses MongoDB document IDs: the client expects the message id as `_id` (not `id`). When deleting from the Admin page the frontend calls `DELETE /api/messages/:id` with the message's `_id`.
- The client dev server uses the proxy defined in `client/vite.config.js` so API calls can use the relative path `/api/messages` during development.
- `jsonwebtoken` was previously present in `server/package.json` but is not used; it has been removed from dependencies.
---

## Data Flow

### User Submitting a Message

```
[ContactForm] (client/components)
    ↓ (user enters name, email, subject, message)
[api.js] sendMessage()
    ↓ (POST /api/messages)
[messageRoutes.js] router.post("/")
    ↓
[messageController.js] createMessage()
    ↓ (validate & create instance)
[message.js] Message.save()
    ↓ (persists to MongoDB)
Response: 201 Created + message object
    ↓
[ContactForm] displays success message
```

### Admin Viewing & Managing Messages

```
[Admin.jsx] isUnlocked → loadMessages()
    ↓
[api.js] fetchMessages()
    ↓ (GET /api/messages)
[messageRoutes.js] router.get("/")
    ↓
[messageController.js] getMessages()
    ↓
[message.js] Message.find().sort()
    ↓ (queries MongoDB)
Response: array of message objects
    ↓
[Admin.jsx] renders messages list
    ↓ (user can click "Delete" button)
[api.js] deleteMessage(msg._id)
    ↓ (DELETE /api/messages/:id)
[messageRoutes.js] router.delete("/:id")
    ↓
[messageController.js] deleteMessage()
    ↓
[message.js] Message.findByIdAndDelete()
    ↓ (removes from MongoDB)
Response: 204 No Content
    ↓
[Admin.jsx] reloads message list
```

---

## Features & Current Status

### ✅ Implemented
- User contact form submission
- Admin dashboard to view all messages
- Basic CRUD operations
- Responsive UI with Tailwind CSS

### 🚧 In Progress / TODO
- [ ] Input validation and sanitization
- [ ] Error handling and centralized logging
- [ ] Authentication & authorization
- [ ] Automated tests (Jest, React Testing Library, Supertest)
- [ ] ESLint + Prettier code style enforcement
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Docker containerization
- [ ] Production deployment docs
- [ ] API documentation (OpenAPI/Swagger)

---

## Project Goals (Production Readiness)

This project is being upgraded to production-level standards:
1. **Code Quality** – Linting, formatting, type checking
2. **Testing** – Unit, integration, and E2E tests
3. **Security** – Input validation, helmet headers, CORS, rate limiting
4. **Performance** – Caching, pagination, optimized builds
5. **DevOps** – Docker, GitHub Actions, deployment guides
6. **Monitoring** – Logging, error tracking, health checks

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Port 5000 already in use** | Change `PORT` in `.env` or kill the process using that port |
| **MongoDB connection fails** | Ensure MongoDB is running or update `MONGODB_URI` in `.env` |
| **CORS errors** | Check backend `app.js` CORS config matches frontend API URL |
| **Blank admin page** | Check browser console for API errors; verify backend is running |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

MIT License – feel free to use this project for learning and production.


