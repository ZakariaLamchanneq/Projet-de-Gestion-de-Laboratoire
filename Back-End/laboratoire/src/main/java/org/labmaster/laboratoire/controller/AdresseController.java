package org.labmaster.laboratoire.controller;

import lombok.RequiredArgsConstructor;
import org.labmaster.laboratoire.dto.adresse.AdresseDTO;
import org.labmaster.laboratoire.service.AdresseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adresses")
@RequiredArgsConstructor
public class AdresseController {

    private final AdresseService adresseService;

    // Create
    @PostMapping("/add")
    public ResponseEntity<?> createAdresse(@RequestBody AdresseDTO adresseDTO) {
        try {
            AdresseDTO createdAdresse = adresseService.createAdresse(adresseDTO);
            return new ResponseEntity<>(createdAdresse, HttpStatus.CREATED);
        } catch (Exception e) {
            return handleException(e, "Failed to create adresse");
        }
    }

    // Fetch all
    @GetMapping("/all")
    public ResponseEntity<?> getAllAdresses() {
        try {
            List<AdresseDTO> adresses = adresseService.getAllAdresses();
            return new ResponseEntity<>(adresses, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve adresses");
        }
    }

    // Search by ID
    @GetMapping("/find/{id}")
    public ResponseEntity<?> getAdresseById(@PathVariable Long id) {
        try {
            return adresseService.getAdresseById(id)
                    .map(adresseDTO -> new ResponseEntity<>(adresseDTO, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve adresse with ID " + id);
        }
    }

    // Update
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateAdresse(@PathVariable Long id, @RequestBody AdresseDTO adresseDTO) {
        try {
            AdresseDTO updatedAdresse = adresseService.updateAdresse(id, adresseDTO);
            return new ResponseEntity<>(updatedAdresse, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to update adresse with ID " + id);
        }
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAdresse(@PathVariable Long id) {
        try {
            boolean isDeleted = adresseService.deleteAdresse(id);
            if (isDeleted) {
                return ResponseEntity.noContent().build();
            } else {
                return new ResponseEntity<>("Adresse not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return handleException(e, "Failed to delete adresse with ID " + id);
        }
    }

    // Exception handler
    private ResponseEntity<String> handleException(Exception e, String message) {
        System.err.println(message + ": " + e.getMessage());
        e.printStackTrace();
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
