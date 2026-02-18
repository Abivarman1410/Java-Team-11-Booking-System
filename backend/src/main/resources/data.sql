-- Sample data for testing (optional)

-- Insert sample users
INSERT INTO users (name, email, phone, role, status, created_at) VALUES
('John Doe', 'john.doe@example.com', '9876543210', 'STUDENT', 'ACTIVE', CURRENT_TIMESTAMP),
('Jane Smith', 'jane.smith@example.com', '9876543211', 'STAFF', 'ACTIVE', CURRENT_TIMESTAMP),
('Bob Wilson', 'bob.wilson@example.com', '9876543212', 'STUDENT', 'ACTIVE', CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- Insert sample resources
INSERT INTO resources (name, type, capacity, status) VALUES
('Computer Lab 1', 'LAB', 40, 'AVAILABLE'),
('Lecture Hall A', 'CLASSROOM', 100, 'AVAILABLE'),
('Main Auditorium', 'EVENT_HALL', 500, 'AVAILABLE'),
('Computer Lab 2', 'LAB', 35, 'AVAILABLE'),
('Seminar Room', 'CLASSROOM', 50, 'AVAILABLE')
ON CONFLICT DO NOTHING;

-- Insert sample bookings
INSERT INTO bookings (user_id, resource_id, booking_date, time_slot, status) VALUES
(1, 1, CURRENT_DATE + INTERVAL '1 day', '09:00-10:00', 'APPROVED'),
(2, 3, CURRENT_DATE + INTERVAL '2 days', '14:00-15:00', 'PENDING'),
(3, 2, CURRENT_DATE + INTERVAL '1 day', '11:00-12:00', 'APPROVED')
ON CONFLICT DO NOTHING;
