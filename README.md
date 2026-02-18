# Campus Resource Management System

A full-stack application for managing campus resources, users, and bookings.

## Features
- User Management (CRUD with role-based access)
- Resource Management (Labs, Classrooms, Event Halls)
- Booking System (with double-booking prevention)

## Tech Stack
- Backend: Spring Boot, JPA/Hibernate
- Frontend: React
- Database: PostgreSQL

## Setup Instructions

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## API Endpoints
- Users: `/api/users`
- Resources: `/api/resources`
- Bookings: `/api/bookings`
