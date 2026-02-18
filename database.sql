-- Create Database
CREATE DATABASE campus_resource;

-- Connect to the database
\c campus_resource;

-- Tables will be auto-created by Spring Boot JPA
-- This file is for reference only

-- Expected tables:
-- 1. users (id, name, email, phone, role, status, created_at)
-- 2. resources (id, name, type, capacity, status)
-- 3. bookings (id, user_id, resource_id, booking_date, time_slot, status)
