package patient.patient.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import patient.patient.client.UtilisateurClient;
import patient.patient.dto.DossierDTO;
import patient.patient.dto.PatientDTO;
import patient.patient.dto.UtilisateurDTO;
import patient.patient.model.dossier.Dossier;
import patient.patient.model.patient.Patient;
import patient.patient.repository.DossierRepository;
import patient.patient.repository.PatientRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DossierService {

    private final DossierRepository dossierRepository;
    private final PatientRepository patientRepository;

    public List<DossierDTO> getAllDossiers() {
        return dossierRepository.findAll().stream().map(this::toDTO).toList();
    }

    public Optional<DossierDTO> getDossierById(Long id) {
        return dossierRepository.findById(id).map(this::toDTO);
    }

    public DossierDTO createDossier(DossierDTO dossierDTO) {
        Dossier dossier = toEntity(dossierDTO);
        Dossier savedDossier = dossierRepository.save(dossier);
        return toDTO(savedDossier);
    }

    public DossierDTO updateDossier(Long id, DossierDTO dossierDTO) {
        Dossier dossier = dossierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dossier not found with id " + id));

        dossier.setFkEmailUtilisateur(dossierDTO.getFkEmailUtilisateur());
        dossier.setDate(dossierDTO.getDate());

        Dossier updatedDossier = dossierRepository.save(dossier);
        return toDTO(updatedDossier);
    }

    public boolean deleteDossier(Long id) {
        if (!dossierRepository.existsById(id)) {
            return false;
        }
        dossierRepository.deleteById(id);
        return true;
    }

    public List<PatientDTO> getPatientsByUtilisateurEmail(String email) {
        return dossierRepository.findByFkEmailUtilisateur(email).stream()
                .map(dossier -> toPatientDTO(dossier.getPatient()))
                .collect(Collectors.toList());
    }

    private PatientDTO toPatientDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setNomComplet(patient.getNomComplet());
        dto.setDateNaissance(patient.getDateNaissance());
        dto.setLieuDeNaissance(patient.getLieuNaissance());
        dto.setSexe(patient.getSexe());
        dto.setTypePieceIdentite(patient.getTypePieceIdentite());
        dto.setNumPieceIdentite(patient.getNumPieceIdentite());
        dto.setAdresse(patient.getAdresse());
        dto.setNumTel(patient.getNumTel());
        dto.setEmail(patient.getEmail());
        dto.setVisiblePour(patient.getVisiblePour());
        return dto;
    }

    private DossierDTO toDTO(Dossier dossier) {
        DossierDTO dto = new DossierDTO();
        dto.setNumDossier(dossier.getNumDossier());
        dto.setFkEmailUtilisateur(dossier.getFkEmailUtilisateur());
        dto.setFkIdPatient(dossier.getPatient().getId());
        dto.setDate(dossier.getDate());
        return dto;
    }

    private Dossier toEntity(DossierDTO dto) {
        Dossier dossier = new Dossier();
        dossier.setNumDossier(dto.getNumDossier());
        dossier.setFkEmailUtilisateur(dto.getFkEmailUtilisateur());
        dossier.setDate(dto.getDate());
        dossier.setPatient(fetchPatientById(dto.getFkIdPatient()));
        return dossier;
    }


    private Patient fetchPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id " + id));
    }

}