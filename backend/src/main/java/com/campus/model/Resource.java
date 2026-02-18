package com.campus.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "resources")
@Data
@NoArgsConstructor
public class Resource {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Resource name is required")
    private String name;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResourceType type;
    
    @Min(value = 1, message = "Capacity must be at least 1")
    private int capacity;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResourceStatus status = ResourceStatus.AVAILABLE;
    
    public enum ResourceType {
        LAB, CLASSROOM, EVENT_HALL
    }
    
    public enum ResourceStatus {
        AVAILABLE, UNAVAILABLE
    }
}
