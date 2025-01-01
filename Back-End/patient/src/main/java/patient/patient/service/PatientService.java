package patient.patient.service;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import patient.patient.dto.PatientDTO;
import patient.patient.model.EmailEvent;
import patient.patient.model.patient.Patient;
import patient.patient.model.SmsEvent;
import patient.patient.repository.PatientRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private KafkaProducerService kafkaProducerService;


    @Transactional
    public PatientDTO createPatient(PatientDTO patientDto) {
        Patient patient = convertToEntity(patientDto);
        patientRepository.save(patient);
        // Send Kafka messages for email and SMS
        EmailEvent emailEvent = new EmailEvent(patient.getEmail(), "Welcome!", "Your account has been successfully created.");
        SmsEvent smsEvent = new SmsEvent(String.valueOf(patient.getNumTel()), "Welcome! Your account has been successfully created.");

        try {
            kafkaProducerService.sendEmail(emailEvent.getRecipient(), emailEvent.getSubject(), emailEvent.getBody());
            kafkaProducerService.sendSms(smsEvent.getPhoneNumber(), smsEvent.getMessage());
            System.out.println("Kafka messages sent successfully for patient: " + patient.getEmail());
        } catch (Exception e) {
            System.err.println("Failed to send Kafka messages for patient: " + patient.getEmail());
        }
        return convertToDTO(patient);
    }

    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PatientDTO getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient introuvable"));
        return convertToDTO(patient);
    }


    public PatientDTO updatePatient(Long id, PatientDTO patientDto) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient introuvable"));

        patient.setNomComplet(patientDto.getNomComplet());
        patient.setDateNaissance(patientDto.getDateNaissance());
        patient.setLieuNaissance(patientDto.getLieuDeNaissance());
        patient.setSexe(patientDto.getSexe());
        patient.setTypePieceIdentite(patientDto.getTypePieceIdentite());
        patient.setNumPieceIdentite(patientDto.getNumPieceIdentite());
        patient.setAdresse(patientDto.getAdresse());
        patient.setNumTel(patientDto.getNumTel());
        patient.setEmail(patientDto.getEmail());
        patient.setVisiblePour(patientDto.getVisiblePour());

        patient = patientRepository.save(patient);
        return convertToDTO(patient);
    }

    public boolean deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            return false;
        }
        patientRepository.deleteById(id);
        return true;
    }


    // Récupérer les patients archivés
    public List<Patient> getArchivedPatients() {
        return patientRepository.findByIsArchived(true);
    }

    // Récupérer les patients non archivés
    public List<Patient> getNonArchivedPatients() {
        return patientRepository.findByIsArchived(false);
    }

    // Archiver un patient
    public Patient archivePatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId).orElse(null);
        if (patient != null) {
            patient.setIsArchived(true);
            return patientRepository.save(patient);
        }
        return null;
    }

    // Désarchiver un patient
    public Patient unarchivePatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId).orElse(null);
        if (patient != null) {
            patient.setIsArchived(false);
            return patientRepository.save(patient);
        }
        return null;
    }

    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO patientDto = new PatientDTO();
        patientDto.setId(patient.getId());
        patientDto.setNomComplet(patient.getNomComplet());
        patientDto.setDateNaissance(patient.getDateNaissance());
        patientDto.setLieuDeNaissance(patient.getLieuNaissance());
        patientDto.setSexe(patient.getSexe());
        patientDto.setTypePieceIdentite(patient.getTypePieceIdentite());
        patientDto.setNumPieceIdentite(patient.getNumPieceIdentite());
        patientDto.setAdresse(patient.getAdresse());
        patientDto.setNumTel(patient.getNumTel());
        patientDto.setEmail(patient.getEmail());
        patientDto.setVisiblePour(patient.getVisiblePour());
        return patientDto;
    }

    private Patient convertToEntity(PatientDTO patientDto) {
        Patient patient = new Patient();
        patient.setId(patientDto.getId());
        patient.setNomComplet(patientDto.getNomComplet());
        patient.setDateNaissance(patientDto.getDateNaissance());
        patient.setLieuNaissance(patientDto.getLieuDeNaissance());
        patient.setSexe(patientDto.getSexe());
        patient.setTypePieceIdentite(patientDto.getTypePieceIdentite());
        patient.setNumPieceIdentite(patientDto.getNumPieceIdentite());
        patient.setAdresse(patientDto.getAdresse());
        patient.setNumTel(patientDto.getNumTel());
        patient.setEmail(patientDto.getEmail());
        patient.setVisiblePour(patientDto.getVisiblePour());
        return patient;
    }
}
