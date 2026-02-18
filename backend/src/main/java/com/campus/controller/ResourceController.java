package com.campus.controller;

import com.campus.model.Resource;
import com.campus.repository.ResourceRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "http://localhost:3000")
public class ResourceController {
    
    private final ResourceRepository resourceRepository;
    
    public ResourceController(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }
    
    @PostMapping
    public ResponseEntity<Resource> createResource(@Valid @RequestBody Resource resource) {
        return ResponseEntity.ok(resourceRepository.save(resource));
    }
    
    @GetMapping
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable Long id) {
        return resourceRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Resource> updateResource(@PathVariable Long id, @Valid @RequestBody Resource resourceDetails) {
        return resourceRepository.findById(id)
            .map(resource -> {
                resource.setName(resourceDetails.getName());
                resource.setType(resourceDetails.getType());
                resource.setCapacity(resourceDetails.getCapacity());
                resource.setStatus(resourceDetails.getStatus());
                return ResponseEntity.ok(resourceRepository.save(resource));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {
        return resourceRepository.findById(id)
            .map(resource -> {
                resourceRepository.delete(resource);
                return ResponseEntity.ok("Resource deleted successfully");
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
