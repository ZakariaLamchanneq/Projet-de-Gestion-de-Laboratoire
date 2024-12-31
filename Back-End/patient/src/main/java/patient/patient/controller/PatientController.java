package patient.patient.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import patient.patient.dto.PatientDTO;
import patient.patient.model.EmailEvent;
import patient.patient.model.Patient;
import patient.patient.model.SmsEvent;
import patient.patient.service.KafkaProducerService;
import patient.patient.service.PatientService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/patients")

public class PatientController {


    @Autowired
    private PatientService patientService;


    @PostMapping("/add")
    public ResponseEntity<PatientDTO> createPatient(@RequestBody PatientDTO patientDto){
        PatientDTO createdPatient = patientService.createPatient(patientDto);
        return new ResponseEntity<>(createdPatient, HttpStatus.OK);
    }

    @GetMapping("/archived")
    public List<Patient> getArchivedPatients() {
        return patientService.getArchivedPatients();
    }

    @GetMapping("/non-archived")
    public List<Patient> getNonArchivedPatients() {
        return patientService.getNonArchivedPatients();
    }

    @PutMapping("/archive/{id}")
    public ResponseEntity<Patient> archivePatient(@PathVariable Long id) {
        Patient patient = patientService.archivePatient(id);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/unarchive/{id}")
    public ResponseEntity<Patient> unarchivePatient(@PathVariable Long id) {
        Patient patient = patientService.unarchivePatient(id);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<PatientDTO>> getAllPatients() {
        List<PatientDTO> patients = patientService.getAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/getPatient/{id}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable Long id) {
        PatientDTO patientDto = patientService.getPatientById(id);
        return new ResponseEntity<>(patientDto, HttpStatus.OK);
    }

    @PutMapping("/updatePatient/{id}")
    public ResponseEntity<PatientDTO> updatePatient(@PathVariable Long id, @RequestBody PatientDTO patientDto) {
        PatientDTO updatedPatient = patientService.updatePatient(id, patientDto);
        return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
    }

    @DeleteMapping("/deletePatient/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
