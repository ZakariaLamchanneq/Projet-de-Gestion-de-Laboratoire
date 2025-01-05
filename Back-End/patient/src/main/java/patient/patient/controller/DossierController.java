package patient.patient.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import patient.patient.dto.DossierDTO;
import patient.patient.dto.PatientDTO;
import patient.patient.service.DossierService;

import java.util.List;

@RestController
@RequestMapping("/api/dossiers")
@RequiredArgsConstructor
public class DossierController {

    private final DossierService dossierService;

    @PostMapping("/add")
    public ResponseEntity<?> createDossier(@RequestBody DossierDTO dossierDTO) {
        try {
            DossierDTO savedDossier = dossierService.createDossier(dossierDTO);
            return new ResponseEntity<>(savedDossier, HttpStatus.CREATED);
        } catch (Exception e) {
            return handleException(e, "Failed to create dossier");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllDossiers() {
        try {
            List<DossierDTO> dossiers = dossierService.getAllDossiers();
            return new ResponseEntity<>(dossiers, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve dossiers");
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getDossierById(@PathVariable Long id) {
        try {
            return dossierService.getDossierById(id)
                    .map(dossierDTO -> new ResponseEntity<>(dossierDTO, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve dossier with ID " + id);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateDossier(@PathVariable Long id, @RequestBody DossierDTO dossierDTO) {
        try {
            DossierDTO updatedDossier = dossierService.updateDossier(id, dossierDTO);
            return new ResponseEntity<>(updatedDossier, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to update dossier with ID " + id);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDossier(@PathVariable Long id) {
        try {
            boolean isDeleted = dossierService.deleteDossier(id);
            if (isDeleted) {
                return ResponseEntity.noContent().build();
            } else {
                return new ResponseEntity<>("Dossier not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return handleException(e, "Failed to delete dossier with ID " + id);
        }
    }

    @GetMapping("/patients/{email}")
    public ResponseEntity<?> getPatientsByUtilisateurEmail(@PathVariable String email) {
        try {
            List<PatientDTO> patients = dossierService.getPatientsByUtilisateurEmail(email);
            return new ResponseEntity<>(patients, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve patients for utilisateur with email " + email);
        }
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendDossierPdfByEmail(@RequestParam("file") MultipartFile file, @RequestParam("email") String email) {
        try {
            dossierService.sendDossierPdfByEmail(file, email);
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send email: " + e.getMessage());
        }
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleMaxSizeException(MaxUploadSizeExceededException exc) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body("File size exceeds the maximum limit!");
    }

    private ResponseEntity<String> handleException(Exception e, String message) {
        System.err.println(message + ": " + e.getMessage());
        e.printStackTrace();
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}