# Campus Resource Management System - Setup Guide

## Prerequisites
- Java 17 or higher
- Node.js 16+ and npm
- PostgreSQL 12+
- Maven

## Database Setup

1. Install PostgreSQL and start the service
2. Create the database:
```sql
CREATE DATABASE campus_resource;
```

3. Update credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=postgres
spring.datasource.password=yourpassword
```

## Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will start on http://localhost:8080

## Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will start on http://localhost:3000

## Testing the Application

1. Open http://localhost:3000 in your browser
2. Create some users (Students/Staff)
3. Create resources (Labs, Classrooms, Event Halls)
4. Make bookings and test the double-booking prevention

## API Endpoints

### Users
- GET /api/users - Get all users
- POST /api/users - Create user
- GET /api/users/{id} - Get user by ID
- PUT /api/users/{id} - Update user
- DELETE /api/users/{id} - Delete user
- GET /api/users/filter?status=ACTIVE - Filter by status

### Resources
- GET /api/resources - Get all resources
- POST /api/resources - Create resource
- GET /api/resources/{id} - Get resource by ID
- PUT /api/resources/{id} - Update resource
- DELETE /api/resources/{id} - Delete resource

### Bookings
- GET /api/bookings - Get all bookings
- POST /api/bookings - Create booking
- GET /api/bookings/{id} - Get booking by ID
- PUT /api/bookings/{id}/status?status=APPROVED - Update status
- DELETE /api/bookings/{id} - Delete booking
- GET /api/bookings/user/{userId} - Get bookings by user
- GET /api/bookings/resource/{resourceId} - Get bookings by resource

## Features Implemented

✅ Module 1 - User Management (CRUD)
- Create, Read, Update, Delete users
- Filter by status (ACTIVE/INACTIVE)
- Role-based (STUDENT/STAFF)
- Unique email validation

✅ Module 2 - Resource Management (CRUD)
- Manage LAB, CLASSROOM, EVENT_HALL
- Track capacity and availability status

✅ Module 3 - Booking Module
- Create bookings with date and time slots
- Double-booking prevention
- Status management (PENDING/APPROVED/REJECTED)
- View bookings by user or resource

## Tech Stack
- Backend: Spring Boot 3.2, JPA/Hibernate
- Frontend: React 18, Axios
- Database: PostgreSQL
- Build Tools: Maven, npm
