# The Biriyani Canteen

A full-stack MERN-based Smart Canteen Management System featuring secure authentication, real-time order tracking, dynamic menu management, an advanced admin dashboard, and an automated token system.

> [!IMPORTANT]
> This application has evolved from a basic food ordering user interface into a production-grade canteen management platform.

---

## 🏗️ Tech Stack & Architecture

### Frontend
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)

### Backend & Database
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

### Security & Essential Modules
[![JWT](https://img.shields.io/badge/JSON_Web_Tokens-000000?style=flat-square&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Bcrypt.js](https://img.shields.io/badge/Bcrypt.js-430098?style=flat-square&logo=auth0&logoColor=white)](https://www.npmjs.com/package/bcryptjs)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?style=flat-square&logo=nodemailer&logoColor=white)](https://nodemailer.com/)

---

## 🧠 Core Problems Solved

The system eliminates inefficiencies in traditional, manual canteen workflows by targeting the following operational bottlenecks:

- `-` Long customer queues and order processing delays.
- `-` Manual, error-prone paper token handling.
- `-` Lack of live order status tracking for consumers.
- `-` Static or manually updated menu boards.
- `-` Absence of a centralized administrative control center.
- `-` Missing infrastructure for modern digital payments.

---

## 🚀 Key Features

### Client-Side Features
- [x] **Optimized Landing Page:** Fully responsive, modern animated homepage designed to deliver a premium user experience akin to leading food-tech applications.
- [x] **Dynamic Menu Ecosystem:** Live menu synchronization pulling data in real-time from MongoDB, complete with Veg/Non-Veg tagging, asset images, and instantaneous availability states.
- [x] **Context-Driven Cart:** State-managed cart utilizing the React Context API, enforcing boundary logic to prevent negative quantities while tracking real-time price totals.
- [x] **Automated Order Dispatch:** Submits clean payloads to the server, writes orders to the database, auto-generates tracking tokens, and triggers interactive success modules.
- [x] **Session Cleanup:** Instantly flushes active cart states upon successful order placement to guarantee transaction security and prevent duplicate charges.

### Authentication & Authorization
- [x] **Two-Step Registration:** Implements secure email verification via 6-digit OTP codes processed through Nodemailer and transient database schemas.
- [x] **Cryptographic Security:** Enforces strict password hashing using `bcryptjs` prior to database insertion.
- [x] **Stateful Sessions:** Implements standard JSON Web Token (JWT) strategies to secure consumer endpoints and authorize client requests.
- [x] **Role-Based Routing (RBAC):** Distinct access tiers separating general client actions from administrative management operations.

### Admin Control Suite
- [x] **Centralized Dashboard:** A professional, unified sidebar layout providing access to analytical controls, inventory, tokens, and active system settings.
- [x] **Live Order Monitoring:** Intercepts incoming requests to display real-time updates containing user data, metadata, and financial totals.
- [x] **State Machine Controls:** Enables administrators to map out and alter order life-cycles dynamically through standard state transitions: `Pending` ➡️ `Cooking` ➡️ `Ready` ➡️ `Delivered`.
- [x] **Inventory Management:** Full CRUD operations over the menu database, featuring advanced media attachment techniques including File Drag & Drop, Local Uploads, and Remote Image URLs.

---

## 🗄️ Database Schema Design

| Collection | Data Fields & Attributes |
| :--- | :--- |
| **User** | `Name`, `Email`, `Password (Hashed)`, `Role (User / Admin)` |
| **OTP** | `OTP Code`, `Expiration Timestamp`, `Temporary Registration State` |
| **Order** | `User Reference`, `Items Matrix`, `Quantities`, `Status State`, `Token ID`, `Total Cost` |
| **Menu** | `Item Name`, `Price Value`, `Classification (Veg/Non-Veg)`, `Availability Status`, `Image Asset` |

---

## 🌐 Rest API Architecture

### Authentication Endpoints
- `POST /api/auth/send-otp` — Generates and dispatches an email verification token.
- `POST /api/auth/verify-otp` — Validates the token and commits user creation.
- `POST /api/auth/login` — Authenticates user credentials and returns a secure JWT session token.

### Menu Management Endpoints
- `GET /api/menu` — Fetches current inventory items.
- `POST /api/menu/add` — Commits a new record to the database (Admin Authorized).
- `PUT /api/menu/update/:id` — Modifies properties or availability parameters.
- `DELETE /api/menu/delete/:id` — Removes an item permanently from inventory.

### Order Routing Endpoints
- `POST /api/orders/place` — Evaluates payload, updates parameters, and generates an order.
- `GET /api/orders/fetch` — Exposes active transaction pipelines.
- `PUT /api/orders/status/:id` — Moves an order through the processing pipeline.

---

## 🛡️ Engineering Challenges Resolved

Developing this platform provided deep full-stack debugging exposure, requiring resolutions for several production-level hurdles:

- Cross-Origin Resource Sharing (CORS) configurations and route synchronization across isolated runtime servers.
- Resilient MongoDB connection pooling and error-handling strategies.
- Boundary logic verification for JWT expirations and race conditions during OTP validations.
- Race conditions during dynamic rendering cycles preventing application crashes or blank client screens.
- Granular administrative role evaluation middleware on protected backend endpoints.

---

## 🔮 Future Development Roadmap

- **Payment Gateways:** Standard native integrations with Razorpay, UPI protocols, and automated static dynamic QR generation pipelines.
- **Duplex Communication:** Migrating from standard polling mechanisms to event-driven WebSockets via Socket.io for immediate server-to-client notifications.
- **Analytical Intelligence:** Introducing regression-based analytical engines to visualize and predict highest-selling stock items and operational revenue distributions.
- **Progressive Web App (PWA):** Generating full manifest caching structures to make the platform fully installable on mobile devices.

---
*Maintained and Developed by Pritam Hazra.*