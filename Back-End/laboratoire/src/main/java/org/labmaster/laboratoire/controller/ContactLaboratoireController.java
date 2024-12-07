package org.labmaster.laboratoire.controller;

import lombok.RequiredArgsConstructor;
import org.labmaster.laboratoire.dto.contactLaboratoire.ContactLaboratoireDTO;
import org.labmaster.laboratoire.service.ContactLaboratoireService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacts-laboratoires")
@RequiredArgsConstructor
public class ContactLaboratoireController {

    private final ContactLaboratoireService contactLaboratoireService;

    @PostMapping("/add")
    public ResponseEntity<ContactLaboratoireDTO> createContactLaboratoire(@RequestBody ContactLaboratoireDTO contactLaboratoireDTO) {
        try {
            ContactLaboratoireDTO savedContactLaboratoireDTO = contactLaboratoireService.createContactLaboratoire(contactLaboratoireDTO);
            return new ResponseEntity<>(savedContactLaboratoireDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("Error creating contactLaboratoire: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllContactLaboratoires() {
        try {
            return new ResponseEntity<>(contactLaboratoireService.getAllContactsLaboratoire(), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error fetching contactLaboratoires: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>("Failed to retrieve contactLaboratoires", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getContactLaboratoireById(@PathVariable Long id) {
        try {
            return contactLaboratoireService.getContactLaboratoireById(id)
                    .map(contactLaboratoireDTO -> new ResponseEntity<>(contactLaboratoireDTO, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            System.out.println("Error fetching contactLaboratoire with ID " + id + ": " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>("Failed to retrieve contactLaboratoire", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateContactLaboratoire(@PathVariable Long id, @RequestBody ContactLaboratoireDTO contactLaboratoireDTO) {
        try {
            ContactLaboratoireDTO updatedContactLaboratoireDTO = contactLaboratoireService.updateContactLaboratoire(id, contactLaboratoireDTO);
            return new ResponseEntity<>(updatedContactLaboratoireDTO, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error updating contactLaboratoire with ID " + id + ": " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>("Failed to update contactLaboratoire", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteContactLaboratoire(@PathVariable Long id) {
        boolean deleted = contactLaboratoireService.deleteContactLaboratoire(id);
        try {
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.out.println("Error deleting contactLaboratoire with ID " + id + ": " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>("Failed to delete contactLaboratoire", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
