# Implementation Plan - UniMart Frontend & Backend Integration

This implementation plan outlines the architecture, existing components, required changes, new features/UIs to be created, environment configurations, and the exact step-by-step strategy to connect the **UniMart** frontend (React + Vite) with the backend (Spring Boot + MySQL).

---

## 1. Project Analysis & Overview

### What is UniMart?
**UniMart** is a web-based University Marketplace platform specifically designed for university students to buy, sell, order, review, and chat about study materials, textbooks, electronics, dorm furniture, and other essentials within their campus community.

### Technology Stack
- **Frontend (`Client`)**:
  - **Core Framework**: React 19 + TypeScript + Vite 8
  - **Styling & UI Components**: Material UI (MUI v9) + Tailwind CSS v4 + Emotion
  - **Routing**: React Router DOM v7 (`createBrowserRouter`)
  - **State Management**: Redux Toolkit (`authSlice`)
  - **Form Handling & Validation**: React Hook Form + Zod
- **Backend (`Server`)**:
  - **Core Framework**: Java 21 + Spring Boot 4.1.1 (Spring Web, Spring Data JPA, Spring Security, Actuator)
  - **Authentication & Security**: JWT (JJWT 0.12.6) + BCrypt Password Encoding
  - **Database & Migration**: MySQL + Flyway database migrations (`V1__create_core_tables.sql`)
  - **API Format**: RESTful JSON APIs (`/api/v1/...`)

---

## 2. Technical Strategy: Connecting Frontend & Backend

```
┌─────────────────────────────────┐                 ┌─────────────────────────────────┐
│     React 19 Frontend (Vite)    │                 │    Spring Boot Backend (Java)   │
│       http://localhost:5173     │                 │       http://localhost:8081     │
├─────────────────────────────────┤                 ├─────────────────────────────────┤
│ - Axios / Fetch API Client      │ HTTP Requests   │ - Spring Security (Stateless)   │
│ - Bearer Token in Header        │───────────────> │ - CORS Allowed (localhost:5173) │
│ - React Hook Form + Zod         │ JSON Responses  │ - JWT Authentication Filter     │
│ - Redux Toolkit Auth State      │ <───────────────│ - Controllers (Auth, Listing, etc)│
└─────────────────────────────────┘                 └─────────────────────────────────┘
                                                             │
                                                             ▼
                                                    ┌─────────────────┐
                                                    │ MySQL Database  │
                                                    └─────────────────┘
```

1. **Environment Setup (`.env`)**:
   - Create `Client/.env` with `VITE_API_BASE_URL=http://localhost:8081/api/v1`.
   - Update `Server/src/main/resources/application.yaml` / environment configs to ensure database credentials and CORS origins are configurable.
2. **CORS & Security Configuration (Backend)**:
   - Add explicit CORS Bean configuration to `SecurityConfig.java` to allow cross-origin requests from `http://localhost:5173` with full headers and HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`).
   - Allow `POST /api/v1/users` (User Registration) in `SecurityConfig` without authentication permit so guests can sign up.
3. **HTTP API Service (Frontend)**:
   - Build a centralized API service (`apiClient.ts`) using standard Fetch/Axios that automatically appends the stored JWT Authorization header (`Bearer <token>`) to requests.
4. **Redux Auth Integration**:
   - Wire `LoginPage` and `RegisterPage` to dispatch Redux actions and save user info + JWT token in `localStorage` & Redux state (`authSlice`).

---

## 3. What Needs to be Changed vs What Needs to be Made New

### What to Change (Existing Codebase)

1. **[Server] [`SecurityConfig.java`](file:///d:/SOFTware%20ARch/Unimart/Server/src/main/java/lk/ac/kln/unimart_backend/config/SecurityConfig.java)**:
   - Update authorization filters to allow `POST /api/v1/users` (User Registration) publicly.
   - Add CORS filter configuration bean for `http://localhost:5173`.
2. **[Client] [`LoginForm.tsx`](file:///d:/SOFTware%20ARch/Unimart/Client/src/features/auth/components/LoginForm.tsx) & [`LoginPage.tsx`](file:///d:/SOFTware%20ARch/Unimart/Client/src/features/auth/pages/LoginPage.tsx)**:
   - Connect login submit to call `POST /api/v1/auth/login`.
   - On success, dispatch `setCredentials({ user, token })` and redirect to home (`/`).
   - Add link to the Registration page.
3. **[Client] [`Header.tsx`](file:///d:/SOFTware%20ARch/Unimart/Client/src/components/common/Header.tsx)**:
   - Dynamically render user menu: when authenticated, show User Name, Role, Create Listing button, Orders, Messages, Notifications, and Logout.
   - Show "Sign In" and "Register" buttons when logged out.
4. **[Client] [`listingsApi.ts`](file:///d:/SOFTware%20ARch/Unimart/Client/src/features/listings/listingsApi.ts)**:
   - Replace static mock functions (`MOCK_LISTINGS`) with real API calls to backend endpoints `GET /api/v1/listings`, `GET /api/v1/listings/{id}`, `GET /api/v1/categories`.
5. **[Client] [`AppRouter.tsx`](file:///d:/SOFTware%20ARch/Unimart/Client/src/routes/AppRouter.tsx)**:
   - Register new routes for Register, Create Listing, Orders, Payments, Chat/Messages, Notifications, and Protected Route wrapper.

---

### What to Make New (New Components & Features)

1. **[Client] `.env` File**:
   - `Client/.env` specifying `VITE_API_BASE_URL=http://localhost:8081/api/v1`.
2. **[Client] Central API Service (`Client/src/services/apiClient.ts`)**:
   - Handles network requests, error handling, JWT header injection, and response parsing.
3. **[Client] Authentication UI - Register Page & Form**:
   - **`RegisterPage.tsx`** & **`RegisterForm.tsx`**: Form supporting full name, university email, password, and role selection (`BUYER`, `SELLER`). Connected to `POST /api/v1/users`.
4. **[Client] Protected Route Guard (`ProtectedRoute.tsx`)**:
   - Prevents unauthenticated users from accessing protected pages (Post Listing, Orders, Chat, Profile).
5. **[Client] Listing Management UI - Create/Edit Listing**:
   - **`CreateListingPage.tsx`**: Form to submit new item listings (title, category dropdown, price, description, image URL inputs) calling `POST /api/v1/listings` & `POST /api/v1/listings/{id}/images`.
6. **[Client] Orders & Checkout UI (`OrdersPage.tsx`, `OrderDetailsDialog.tsx`)**:
   - Interface for placing orders (`POST /api/v1/orders`), viewing buyer/seller order status (`POSTED`, `PAID`, `COMPLETED`, `CANCELLED`), and submitting payments (`POST /api/v1/payments`).
7. **[Client] Conversations & Real-Time Messaging UI (`ChatPage.tsx`)**:
   - Messenger interface to start conversations on listings (`POST /api/v1/conversations`), list active conversations, and exchange messages (`POST /api/v1/messages`).
8. **[Client] Ratings & Reviews UI (`ReviewSection.tsx`)**:
   - Interface to submit seller reviews after completed orders (`POST /api/v1/reviews`) and view ratings.
9. **[Client] Notifications Drawer UI (`NotificationMenu.tsx`)**:
   - Header badge notification menu showing incoming user notifications (`GET /api/v1/notifications`).

---

## User Review Required

> [!IMPORTANT]
> **Database & Backend Port**:
> Backend defaults to port `8081` with MySQL database URL `jdbc:mysql://127.0.0.1:3306/unimart`. Ensure your local MySQL server is running with database `unimart` created (or standard MySQL environment).

> [!NOTE]
> **Authentication Flow**:
> Registration creates a user with `BUYER` or `SELLER` role via `POST /api/v1/users`. Login returns a JWT token via `POST /api/v1/auth/login`, which is stored in Redux & localStorage to authorize subsequent REST API calls.

---

## Verification Plan

### Automated Verification
- Verify TypeScript builds cleanly: `npm run build` in `Client/`
- Build Spring Boot backend: `mvnw compile` in `Server/`

### Manual Verification
- Test User Registration (`/register`) with a new student email.
- Test User Login (`/login`) with valid credentials.
- Test Browsing Listings (`/`) fetched live from `/api/v1/listings`.
- Test Creating a Listing (`/listings/new`).
- Test Ordering and Payment flow (`/orders`).
- Test Messaging/Chat between buyer and seller (`/chat`).
