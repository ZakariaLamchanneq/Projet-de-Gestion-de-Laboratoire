package org.labmaster.laboratoire.controller;

import lombok.RequiredArgsConstructor;
import org.labmaster.laboratoire.dto.laboratoire.FullLaboratoireResponse;
import org.labmaster.laboratoire.dto.laboratoire.LaboratoireDTO;
import org.labmaster.laboratoire.exception.ResourceNotFoundException;
import org.labmaster.laboratoire.service.LaboratoireService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/laboratoires")
@RequiredArgsConstructor
public class LaboratoireController {

    private final LaboratoireService laboratoireService;

    @PostMapping("/add")
    public ResponseEntity<LaboratoireDTO> createLaboratoire(@ModelAttribute LaboratoireDTO laboratoireDTO) throws IOException {
        LaboratoireDTO savedLaboratoire = laboratoireService.createLaboratoire(laboratoireDTO);
        return new ResponseEntity<>(savedLaboratoire, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<LaboratoireDTO>> getAllLaboratoires() {
        List<LaboratoireDTO> laboratoires = laboratoireService.getAllLaboratoires();
        return new ResponseEntity<>(laboratoires, HttpStatus.OK);
    }

    // Read/Search
    @GetMapping("/find/{id}")
    public ResponseEntity<LaboratoireDTO> getLaboratoireById(@PathVariable Long id) {
        try {
            return laboratoireService.getLaboratoireById(id)
                    .map(laboratoireDTO -> new ResponseEntity<>(laboratoireDTO, HttpStatus.OK))
                    .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Return 404 if not found
        } catch (Exception e) {
            // Log the error and return a 500 internal server error
            System.out.println("Error retrieving laboratoire with ID: " + id);
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Return 500 on error
        }
    }

    // Update
    @PutMapping("/edit/{id}")
    public ResponseEntity<LaboratoireDTO> updateLaboratoire(@PathVariable Long id, @ModelAttribute LaboratoireDTO laboratoireDTO) {
        try {
            // First, check if the laboratoire exists
            LaboratoireDTO updatedLaboratoire = laboratoireService.updateLaboratoire(id, laboratoireDTO);
            return new ResponseEntity<>(updatedLaboratoire, HttpStatus.OK); // Return 200 with updated data
        } catch (ResourceNotFoundException e) {
            // If laboratoire not found, return 404
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Log the error and return a 500 internal server error
            System.out.println("Error updating laboratoire with ID: " + id);
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Return 500 on error
        }
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteLaboratoire(@PathVariable Long id) {
        try {
            boolean deleted = laboratoireService.deleteLaboratoire(id);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Deletion successful, return 204
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Deletion failed, resource not found, return 404
            }
        } catch (Exception e) {
            // Log the error and return a 500 internal server error
            System.out.println("Error deleting laboratoire with ID: " + id);
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("with-users/{laboratoire-id}")
    public ResponseEntity<FullLaboratoireResponse> getAllLaboratoires(@PathVariable("laboratoire-id") Long laboratoireId) {
        FullLaboratoireResponse laboratoiresWithUsers = laboratoireService.getLaboratoiresWithUsers(laboratoireId);
        return new ResponseEntity<>(laboratoiresWithUsers, HttpStatus.OK);
    }
}
