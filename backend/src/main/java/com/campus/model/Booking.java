package com.campus.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "User ID is required")
    @Column(name = "user_id")
    private Long userId;
    
    @NotNull(message = "Resource ID is required")
    @Column(name = "resource_id")
    private Long resourceId;
    
    @NotNull(message = "Booking date is required")
    @Column(name = "booking_date")
    private LocalDate bookingDate;
    
    @NotNull(message = "Time slot is required")
    @Column(name = "time_slot")
    private String timeSlot;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.PENDING;
    
    public enum BookingStatus {
        PENDING, APPROVED, REJECTED
    }
}
