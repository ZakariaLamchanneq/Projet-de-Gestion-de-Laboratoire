package patient.patient.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import patient.patient.dto.PatientDTO;
import patient.patient.model.patient.Patient;
import patient.patient.service.PatientService;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/add")
    public ResponseEntity<?> createPatient(@RequestBody PatientDTO patientDto) {
        try {
            PatientDTO createdPatient = patientService.createPatient(patientDto);
            return new ResponseEntity<>(createdPatient, HttpStatus.CREATED);
        } catch (Exception e) {
            return handleException(e, "Failed to create patient");
        }
    }


    // Endpoint to get archived patients
    @GetMapping("/archived")
    public List<PatientDTO> getArchivedPatients() {
        return patientService.getArchivedPatients();
    }

    // Endpoint to get non-archived patients
    @GetMapping("/non-archived")
    public List<PatientDTO> getNonArchivedPatients() {
        return patientService.getNonArchivedPatients();
    }

    // Endpoint to archive a patient
    @PutMapping("/{id}/archive")
    public PatientDTO archivePatient(@PathVariable Long id) {
        return patientService.archivePatient(id);
    }

    // Endpoint to unarchive a patient
    @PutMapping("/{id}/unarchive")
    public PatientDTO unarchivePatient(@PathVariable Long id) {
        return patientService.unarchivePatient(id);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllPatients() {
        try {
            List<PatientDTO> patients = patientService.getAllPatients();
            return new ResponseEntity<>(patients, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve patients");
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getPatientById(@PathVariable Long id) {
        try {
            PatientDTO patientDto = patientService.getPatientById(id);
            return new ResponseEntity<>(patientDto, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve patient with ID " + id);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updatePatient(@PathVariable Long id, @RequestBody PatientDTO patientDto) {
        try {
            PatientDTO updatedPatient = patientService.updatePatient(id, patientDto);
            return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to update patient with ID " + id);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Long id) {
        try {
            boolean isDeleted = patientService.deletePatient(id);
            if (isDeleted) {
                return ResponseEntity.noContent().build();
            } else {
                return new ResponseEntity<>("Patient not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return handleException(e, "Failed to delete patient with ID " + id);
        }
    }

    private ResponseEntity<String> handleException(Exception e, String message) {
        System.err.println(message + ": " + e.getMessage());
        e.printStackTrace();
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}