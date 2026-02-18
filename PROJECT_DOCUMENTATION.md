# Campus Resource Management System - Complete Documentation

## 📋 Project Overview

A full-stack web application for managing campus resources, users, and bookings. Built with modern technologies following industry best practices.

---

## 🏗️ System Architecture

### Architecture Pattern: **Three-Tier Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│                    (React Frontend)                          │
│                    Port: 3000                                │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST API
                       │ (JSON)
┌──────────────────────▼──────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│                  (Spring Boot Backend)                       │
│                    Port: 8080                                │
└──────────────────────┬──────────────────────────────────────┘
                       │ JDBC
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                      DATA LAYER                              │
│              (Supabase PostgreSQL Database)                  │
│                    Port: 5432                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 FRONTEND (React)

### Technologies Used

1. **React 18.2.0**
   - JavaScript library for building user interfaces
   - Component-based architecture
   - Virtual DOM for efficient rendering

2. **Axios 1.6.0**
   - Promise-based HTTP client
   - Used for making API calls to backend
   - Handles request/response interceptors

3. **React Scripts 5.0.1**
   - Build tooling and development server
   - Webpack configuration
   - Babel transpilation

### Frontend Structure

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/             # React components
│   │   ├── UserManagement.js   # User CRUD operations
│   │   ├── ResourceManagement.js  # Resource CRUD
│   │   └── BookingManagement.js   # Booking CRUD
│   ├── api/
│   │   └── api.js              # API service layer
│   ├── App.js                  # Main application component
│   ├── App.css                 # Application styles
│   ├── index.js                # React entry point
│   └── index.css               # Global styles
└── package.json                # Dependencies
```

### Component Architecture

#### 1. **App.js** (Main Component)
- **Purpose**: Root component, manages navigation
- **State Management**: 
  - `activeTab` - tracks which module is displayed
- **Features**:
  - Tab-based navigation
  - Conditional rendering of child components

#### 2. **UserManagement.js**
- **Purpose**: Manage users (Students/Staff)
- **State Variables**:
  - `users` - array of user objects
  - `formData` - form input values
  - `editingId` - tracks which user is being edited
  - `message` - success/error messages
- **API Calls**:
  - GET `/api/users` - Fetch all users
  - POST `/api/users` - Create new user
  - PUT `/api/users/{id}` - Update user
  - DELETE `/api/users/{id}` - Delete user

#### 3. **ResourceManagement.js**
- **Purpose**: Manage campus resources
- **Resource Types**: LAB, CLASSROOM, EVENT_HALL
- **API Calls**:
  - GET `/api/resources` - Fetch all resources
  - POST `/api/resources` - Create resource
  - PUT `/api/resources/{id}` - Update resource
  - DELETE `/api/resources/{id}` - Delete resource

#### 4. **BookingManagement.js**
- **Purpose**: Handle resource bookings
- **Business Logic**: 
  - Prevents double-booking (same resource, date, time)
  - Status workflow: PENDING → APPROVED/REJECTED
- **API Calls**:
  - GET `/api/bookings` - Fetch all bookings
  - POST `/api/bookings` - Create booking
  - PUT `/api/bookings/{id}/status` - Update status
  - DELETE `/api/bookings/{id}` - Delete booking

### API Service Layer (api.js)

```javascript
// Base configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Axios instance with default headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Organized API endpoints by module
- userAPI: { getAll, getById, create, update, delete, filterByStatus }
- resourceAPI: { getAll, getById, create, update, delete }
- bookingAPI: { getAll, getById, create, updateStatus, delete, getByUser, getByResource }
```

### CSS Styling Approach

- **Modern CSS3** with Flexbox and Grid
- **Gradient backgrounds** for visual appeal
- **Responsive design** principles
- **Component-scoped styles**
- **Badge system** for status indicators
- **Hover effects** for better UX

---

## ☕ BACKEND (Spring Boot)

### Technologies Used

1. **Spring Boot 3.2.0**
   - Framework for building Java applications
   - Auto-configuration
   - Embedded Tomcat server

2. **Spring Data JPA**
   - Data access abstraction
   - Repository pattern implementation
   - Automatic query generation

3. **Hibernate 6.3.1**
   - ORM (Object-Relational Mapping)
   - Entity management
   - Transaction handling

4. **PostgreSQL Driver 42.6.0**
   - JDBC driver for PostgreSQL
   - Connection pooling via HikariCP

5. **Lombok**
   - Reduces boilerplate code
   - Annotations: @Data, @NoArgsConstructor
   - Auto-generates getters, setters, toString

6. **Jakarta Validation**
   - Bean validation
   - Annotations: @NotBlank, @Email, @Min

### Backend Structure

```
backend/
├── src/main/
│   ├── java/com/campus/
│   │   ├── CampusResourceManagementApplication.java  # Main class
│   │   ├── model/                    # Entity classes
│   │   │   ├── User.java
│   │   │   ├── Resource.java
│   │   │   └── Booking.java
│   │   ├── repository/               # Data access layer
│   │   │   ├── UserRepository.java
│   │   │   ├── ResourceRepository.java
│   │   │   └── BookingRepository.java
│   │   └── controller/               # REST API endpoints
│   │       ├── UserController.java
│   │       ├── ResourceController.java
│   │       └── BookingController.java
│   └── resources/
│       ├── application.properties    # Configuration
│       ├── schema.sql               # Database schema
│       └── data.sql                 # Sample data
└── pom.xml                          # Maven dependencies
```

### Layered Architecture

#### 1. **Model Layer** (Entities)

**User.java**
```java
@Entity - JPA entity annotation
@Table(name = "users") - Maps to database table
@Data - Lombok: generates getters/setters
@NoArgsConstructor - Lombok: generates no-arg constructor

Fields:
- id (Long) - Primary key, auto-generated
- name (String) - User's full name
- email (String) - Unique email address
- phone (String) - Contact number
- role (Enum) - STUDENT or STAFF
- status (Enum) - ACTIVE or INACTIVE
- createdAt (LocalDateTime) - Timestamp

Annotations:
- @Id, @GeneratedValue - Primary key configuration
- @Column - Column constraints
- @Enumerated - Enum mapping
- @PrePersist - Lifecycle callback
```

**Resource.java**
```java
Fields:
- id (Long) - Primary key
- name (String) - Resource name
- type (Enum) - LAB, CLASSROOM, EVENT_HALL
- capacity (int) - Maximum occupancy
- status (Enum) - AVAILABLE, UNAVAILABLE

Validation:
- @NotBlank - Name cannot be empty
- @Min(1) - Capacity must be positive
```

**Booking.java**
```java
Fields:
- id (Long) - Primary key
- userId (Long) - Foreign key to users
- resourceId (Long) - Foreign key to resources
- bookingDate (LocalDate) - Date of booking
- timeSlot (String) - Time range (e.g., "09:00-10:00")
- status (Enum) - PENDING, APPROVED, REJECTED

Constraints:
- Unique constraint on (resourceId, bookingDate, timeSlot)
- Prevents double-booking
```

#### 2. **Repository Layer** (Data Access)

**Spring Data JPA Repositories**
```java
public interface UserRepository extends JpaRepository<User, Long> {
    // Automatic CRUD methods:
    // - save(), findAll(), findById(), deleteById()
    
    // Custom query methods:
    List<User> findByStatus(User.Status status);
    boolean existsByEmail(String email);
}
```

**Benefits**:
- No SQL code needed
- Method name conventions generate queries
- Transaction management
- Exception translation

#### 3. **Controller Layer** (REST API)

**UserController.java**
```java
@RestController - Marks as REST controller
@RequestMapping("/api/users") - Base URL path
@CrossOrigin - Enables CORS for frontend

Endpoints:
- POST /api/users - Create user
- GET /api/users - Get all users
- GET /api/users/{id} - Get user by ID
- PUT /api/users/{id} - Update user
- DELETE /api/users/{id} - Delete user
- GET /api/users/filter?status=ACTIVE - Filter by status

HTTP Methods:
- @PostMapping - Create
- @GetMapping - Read
- @PutMapping - Update
- @DeleteMapping - Delete

Response Types:
- ResponseEntity<T> - Wraps response with HTTP status
- @Valid - Triggers validation
- @PathVariable - Extracts URL parameters
- @RequestBody - Parses JSON request body
```

### REST API Design

**RESTful Principles**:
1. **Resource-based URLs**: `/api/users`, `/api/resources`
2. **HTTP methods**: GET, POST, PUT, DELETE
3. **Status codes**: 200 OK, 201 Created, 404 Not Found
4. **JSON format**: Request and response bodies
5. **Stateless**: No session management

**API Response Patterns**:
```java
// Success with data
return ResponseEntity.ok(user);

// Not found
return ResponseEntity.notFound().build();

// Bad request with message
return ResponseEntity.badRequest().body("Error message");
```

---

## 🗄️ DATABASE (PostgreSQL)

### Database Provider: **Supabase**
- Cloud-hosted PostgreSQL
- Automatic backups
- Connection pooling
- SSL encryption

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('STUDENT', 'STAFF')),
    status VARCHAR(50) CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

#### Resources Table
```sql
CREATE TABLE resources (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('LAB', 'CLASSROOM', 'EVENT_HALL')),
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    status VARCHAR(50) CHECK (status IN ('AVAILABLE', 'UNAVAILABLE'))
);
```

#### Bookings Table
```sql
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    resource_id BIGINT NOT NULL,
    booking_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    UNIQUE (resource_id, booking_date, time_slot)
);
```

### Database Relationships

```
users (1) ──────── (N) bookings
                        │
resources (1) ────── (N) bookings

Relationship Types:
- One-to-Many: One user can have many bookings
- One-to-Many: One resource can have many bookings
- Cascade Delete: Deleting user/resource deletes their bookings
```

### Indexes for Performance
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_resource ON bookings(resource_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
```

---

## 🔄 Data Flow

### Example: Creating a User

1. **Frontend (React)**:
   ```javascript
   // User fills form and clicks "Create User"
   const formData = { name, email, phone, role, status };
   await userAPI.create(formData);
   ```

2. **HTTP Request**:
   ```
   POST http://localhost:8080/api/users
   Content-Type: application/json
   
   {
     "name": "John Doe",
     "email": "john@example.com",
     "phone": "1234567890",
     "role": "STUDENT",
     "status": "ACTIVE"
   }
   ```

3. **Backend (Spring Boot)**:
   ```java
   @PostMapping
   public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
       // Validate email uniqueness
       if (userRepository.existsByEmail(user.getEmail())) {
           return ResponseEntity.badRequest().body("Email exists");
       }
       // Save to database
       return ResponseEntity.ok(userRepository.save(user));
   }
   ```

4. **Database (PostgreSQL)**:
   ```sql
   INSERT INTO users (name, email, phone, role, status, created_at)
   VALUES ('John Doe', 'john@example.com', '1234567890', 
           'STUDENT', 'ACTIVE', CURRENT_TIMESTAMP);
   ```

5. **Response Flow**:
   ```
   Database → JPA → Controller → JSON → Axios → React Component
   ```

---

## 🔐 Key Features Implementation

### 1. **Email Uniqueness Validation**
- **Backend**: `existsByEmail()` check before save
- **Database**: UNIQUE constraint on email column
- **Frontend**: Displays error message if duplicate

### 2. **Double-Booking Prevention**
- **Backend**: Custom query checks existing bookings
- **Database**: UNIQUE constraint on (resource_id, booking_date, time_slot)
- **Logic**: Returns error if slot already booked

### 3. **CORS Configuration**
```java
@CrossOrigin(origins = "http://localhost:3000")
// Allows frontend to call backend APIs
```

### 4. **Automatic Timestamps**
```java
@PrePersist
protected void onCreate() {
    createdAt = LocalDateTime.now();
}
```

### 5. **Enum Validation**
- Database CHECK constraints
- JPA @Enumerated mapping
- Type safety in code

---

## 🛠️ Build Tools

### Frontend: **npm**
- Package manager for JavaScript
- Scripts: `npm start`, `npm build`
- Dependency management

### Backend: **Maven**
- Build automation for Java
- Dependency management via pom.xml
- Commands: `mvn clean install`, `mvn spring-boot:run`

---

## 📦 Deployment Architecture

```
Development:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Database: Supabase Cloud

Production (Recommended):
- Frontend: Vercel/Netlify
- Backend: Heroku/AWS/Railway
- Database: Supabase (already cloud)
```

---

## 🎯 Design Patterns Used

1. **MVC Pattern**: Model-View-Controller separation
2. **Repository Pattern**: Data access abstraction
3. **DTO Pattern**: Data transfer between layers
4. **Singleton Pattern**: Spring beans
5. **Factory Pattern**: JPA entity creation
6. **Observer Pattern**: React state management

---

## 📊 Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | UI components |
| HTTP Client | Axios | API communication |
| Backend | Spring Boot 3.2 | REST API server |
| ORM | Hibernate/JPA | Database mapping |
| Database | PostgreSQL | Data persistence |
| Cloud DB | Supabase | Hosted database |
| Build (FE) | npm/Webpack | Frontend bundling |
| Build (BE) | Maven | Backend compilation |
| Language (FE) | JavaScript | Frontend logic |
| Language (BE) | Java 17 | Backend logic |

---

## 🚀 Key Advantages

1. **Separation of Concerns**: Clear layer boundaries
2. **Scalability**: Can scale frontend/backend independently
3. **Maintainability**: Modular code structure
4. **Type Safety**: Java strong typing + validation
5. **Performance**: Connection pooling, indexes
6. **Security**: Input validation, SQL injection prevention
7. **Modern Stack**: Industry-standard technologies
8. **Cloud-Ready**: Easy deployment to cloud platforms

---

This architecture follows enterprise-level best practices and is suitable for production deployment with proper security enhancements (authentication, authorization, HTTPS, etc.).
