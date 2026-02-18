package com.campus.controller;

import com.campus.model.Booking;
import com.campus.repository.BookingRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    
    private final BookingRepository bookingRepository;
    
    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    
    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody Booking booking) {
        boolean exists = bookingRepository.existsByResourceIdAndBookingDateAndTimeSlot(
            booking.getResourceId(), 
            booking.getBookingDate(), 
            booking.getTimeSlot()
        );
        
        if (exists) {
            return ResponseEntity.badRequest()
                .body("Resource already booked for this date and time slot");
        }
        
        return ResponseEntity.ok(bookingRepository.save(booking));
    }
    
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    @GetMapping("/resource/{resourceId}")
    public List<Booking> getBookingsByResource(@PathVariable Long resourceId) {
        return bookingRepository.findByResourceId(resourceId);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(
        @PathVariable Long id, 
        @RequestParam Booking.BookingStatus status
    ) {
        return bookingRepository.findById(id)
            .map(booking -> {
                booking.setStatus(status);
                return ResponseEntity.ok(bookingRepository.save(booking));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        return bookingRepository.findById(id)
            .map(booking -> {
                bookingRepository.delete(booking);
                return ResponseEntity.ok("Booking deleted successfully");
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
