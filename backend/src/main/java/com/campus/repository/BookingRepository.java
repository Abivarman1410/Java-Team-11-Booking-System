package com.campus.repository;

import com.campus.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    boolean existsByResourceIdAndBookingDateAndTimeSlot(Long resourceId, LocalDate bookingDate, String timeSlot);
    List<Booking> findByUserId(Long userId);
    List<Booking> findByResourceId(Long resourceId);
}
