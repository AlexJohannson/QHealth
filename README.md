#  QHealth

QHealth is a fullstack medical institution management system built with **Django REST Framework (DRF)** on the backend and **React** on the frontend.  
It provides secure role-based access and real-time functionality for booking diagnostics, doctor visits, managing patient journals, and prescriptions.

##  Key Features
-  **Role-based system**: Superuser, Admin, Doctor, Operator, Pharmacist, Patient  
-  **User management**: registration, authentication (JWT), profile updates, blocking, role assignment  
-  **Medical workflows**:
  - Booking diagnostics and doctor visits  
  - Patient journals (medical records)  
  - Prescription management  
-  **Data handling**:
  - Pagination and filtering for all lists  
  - Real-time updates via WebSockets (diagnostics, bookings, journals, prescriptions)  
-  **Security**:
  - JWT authentication  
  - Login attempt limitation (5 failed → API blocked for 10 minutes)  
- **Tech stack**:
  - Backend: Django REST Framework + MySQL  
  - Frontend: React  
  - Infrastructure: Docker, Docker Compose, Poetry, Nginx  
  - API Documentation: Swagger + Postman collection  
  - Test backend coverage: views - api`s, filters, managers, models, permissions, serializers 

---

## Technology: 
- **Backend:**
    - Python 3.12+;
    - Django 4+;
    - Django REST Framework;
    - JWT Authentication (Simple JWT);
    - Celery + Redis;
    - MySQL;
    - Channels + Daphne + WebSocket;
    - DRF-YASG (Swagger);

- **DevOps:**
    - Docker / Docker Compose;
    - Poetry;
    - Nginx;

- **Docker services:**
    - web: Django + Daphne (ASGI) server;
    - db: MySQL; 
    - redis: Message broker for Celery;
    - nginx: Reverse proxy server;
    - celery: Background task processor (auto-started);
    - celery-beat: Scheduled task proccessor (auto-started);

---

## Key Libraries:
- **Backend:**
  - Django;
  - Django REST Framework;
  - Simple JWT;
  - Celery;
  - Redis;
  - Django Celery Beat;
  - Django Celery Results;
  - Channels + Daphne + Channels Redis;
  - DRF YASG (Swagger);
  - Django Filter;
  - isort;
- **Frontend:**
    - react;
    - react-dom;
    - react-router-dom;
    - axios;
    - joi;
    - websocket;
    - react-hook-form;
    - npm-watch;
    -  **Dev Dependencies:**
    - @types/websocket;

---

## Django Settings Highlights:
- MySQL database (configured via enviroment variables);
- Custom user model: UserModel;
- Static files served via /drf-static/ (nginx);
- Daphne server (ASGI) for WebSocket support;
- Celery configured with Redis;

---
## Backend Notes

The backend of **QHealth** is built with **Django REST Framework (DRF)** and provides a secure, scalable API layer for all application features.  
It is designed to handle role-based access, medical workflows, and real-time updates through WebSockets.

### Highlights
- **Architecture:** modular Django apps for users, diagnostics, visits, journals, and prescriptions.
- **Authentication:** JWT-based authentication with role management (Superuser, Admin, Doctor, Operator, Pharmacist, Patient).
- **Database:** MySQL with migrations managed via Django ORM.
- **Real-time communication:** Channels + Daphne + WebSockets for live updates (diagnostics, bookings, journals, prescriptions).
- **Background tasks:** Celery + Redis for asynchronous and scheduled jobs (notifications, cleanup, reporting).
- **API documentation:** Swagger (DRF-YASG) and Postman collection for testing and integration.
- **Testing:** coverage: views - api`s, filters, managers, models, permissions, serializers 
- **Deployment:** containerized with Docker, orchestrated via Docker Compose, served through Nginx.

### Key Features on Backend
- Secure role-based endpoints for all user types.
- CRUD operations for diagnostics, visits, journals, and prescriptions.
- Pagination and filtering integrated into API responses.
- Error handling aligned with frontend validation.
- Logging and monitoring of user activity (including login attempts).

---

## Frontend Notes:
The frontend of **QHealth** is built with **React** and provides a clear, lightweight, and responsive user interface.  
It is designed to support role-based access and seamless interaction with the backend API.

### Highlights
- **Project structure:**
  - `src/components/` → reusable UI components;
  - `src/pages/` → role-based pages (Superuser, Admin, Doctor, Operator, Pharmacist, Patient);
  - `src/hooks/` → custom React hooks for navigation;
  - `src/services/` → Axios configuration and API endpoints;
- **Routing:** handled via `react-router-dom` with protected routes for each role.
- **Forms:** managed with `react-hook-form` for validation and error handling.
- **API communication:** Axios is used for REST API requests; WebSocket client for real-time updates.
- **Styling:** simple and responsive design.

### Key Features on Frontend
- Role-based dashboards (different views for Superuser, Admin, Doctor, Operator, Pharmacist, Patient).
- Pagination and filtering integrated into tables and lists.
- Real-time updates via WebSockets for diagnostics, bookings, journals, and prescriptions.
- Error handling and validation aligned with backend responses.

---

## API Documentation:
- Swagger;
- Postman Collection;

---

## Environment Variables (.env):
    SECRET_KEY =
    DEBUG =

    MYSQL_USER =
    MYSQL_PASSWORD =
    MYSQL_ROOT_PASSWORD =
    MYSQL_DATABASE =
    MYSQL_HOST =
    MYSQL_PORT =


    EMAIL_HOST =
    EMAIL_HOST_USER =
    EMAIL_HOST_PASSWORD =
    EMAIL_PORT =

    REDIS_HOST=
    REDIS_PORT=
    REDIS_DB=

---

## Project Setup:
- **1. Clone the repository:**
```bash
git clone https://github.com/AlexJohannson/QHealth
cd QHealth
```
- **2. Configure .env file based on .env.example.**
- **3. Build and start services:**
```bash
docker compose up --build
```
- **4. Apply migrations:**
```bash
docker compose run --rm app sh
python manage.py makemigrations
python manage.py migrate
```
- **Create superuser:**
```bash
docker compose run --rm app sh
python manage.py createsuperuser
email: <your_email>
password: <your_password>
```

---

## Project Test:
- **For test the project:**
```bash
docker compose run --rm app sh
python manage.py test
```

---

# Business flow overview for QHealth

Everything is build around a simple, safe interaction of roles: the patient initiates, the operator coordinate,
the doctor diagnoses and documents, the pharmacist prescribes prescriptions and the admin ensures work continuity.

### Patient flow:

- **Registration and activation:**
  - The patient registers, activate the account via email and logs in.
- **Initiate a diagnosis:**
  - The patient reviews the list of diagnoses and create e request without a date and time.
- **Books doctors appointments:**
  - The patient reviews their reservation, can cancel the appointment at list 24 hours before the appointments 
    (information about canceled patient get in email notification); receives email notification about 
    booking/cancellations.
- **View history:**
  - The patient sees their journals and prescriptions (read only) a complete, unchangeable treatment history.

### Operator flow:

- **Patient contact:**
  - The operator receives a request without a date and time, calls the patient, specifies the purpose, symptoms and
    needs for a doctors visit.
- **Booking with date and time:**
  - The operator books a diagnosis or a doctors visit with a specific date and time, the system checks the
    doctors availability and avoids duplication.
- **Operation support:**
  - The operator can delete/cancel the booking as needed, the patient receives appropriate email notification.

  
### Doctor flow:

- **Patient access:**
  - The doctor views a filtered list of patients, their bookings and history.
- **Clinical documentation:**
  - The doctor creates entries in the patient journal without regex restrictions. Corrections are made with new
    entries to maintain a complete history.


### Pharmacist flow:

- **Prescription assignment:**
  - The pharmacist creates prescriptions for a patient without regex restrictions, each new prescription is 
    stored as a separate record.
- **View:**
  - Has access to diagnoses and prescriptions associated with the patient.


### Admin/Superuser flow:

- **Business continuity:**
  - Admin/superuser manages users, roles, diagnostics. Block/Unblock accounts and doctors.
- **Emergency actions:**
  - In case of technical failures, performs booking, creating journal and prescriptions at the request of staff.
    Has full audit (logins, history of actions)


### System guarantees:

- **Data consistency:**
  - Cannot delete a patient with active bookings or a doctor with scheduled visit. Diagnoses are not duplicate.
- **Real-time and notification:**
  - WebSocket for list updates. Celery sends all critical email notifications (bookings, block/unblock, greetings,
    users GRUD operations, role notification). 