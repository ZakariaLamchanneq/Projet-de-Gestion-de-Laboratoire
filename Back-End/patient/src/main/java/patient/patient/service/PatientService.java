package patient.patient.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import patient.patient.dto.PatientDTO;
import patient.patient.model.Patient;
import patient.patient.repository.PatientRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public PatientDTO createPatient (PatientDTO patientDto){
        Patient patient = convertToEntity(patientDto);
        patientRepository.save(patient);
        return convertToDTO(patient);
    }

    public List<PatientDTO> getAllPatients(){
        return patientRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PatientDTO getPatientById(Long id){
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

    public void deletePatient(Long id){
        patientRepository.deleteById(id);
    }




    private PatientDTO convertToDTO (Patient patient){
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

    private Patient convertToEntity (PatientDTO patientDto){
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
