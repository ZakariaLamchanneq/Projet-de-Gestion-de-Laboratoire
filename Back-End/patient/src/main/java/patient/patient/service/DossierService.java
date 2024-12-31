package patient.patient.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import patient.patient.client.UtilisateurClient;
import patient.patient.dto.DossierDTO;
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
    private final UtilisateurClient utilisateurClient;

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

    public List<Patient> getPatientsByUtilisateurEmail(String email) {
        UtilisateurDTO utilisateur = fetchUtilisateurByEmail(email);
        return dossierRepository.findAll().stream()
                .filter(dossier -> dossier.getFkEmailUtilisateur().equals(email))
                .map(Dossier::getPatient)
                .collect(Collectors.toList());
    }

    private DossierDTO toDTO(Dossier dossier) {
        DossierDTO dto = new DossierDTO();
        dto.setNumDossier(dossier.getNumDossier());
        dto.setFkEmailUtilisateur(dossier.getFkEmailUtilisateur());
        dto.setFkNumPatient(dossier.getPatient().getId());
        dto.setDate(dossier.getDate());
        return dto;
    }

    private Dossier toEntity(DossierDTO dto) {
        Dossier dossier = new Dossier();
        dossier.setNumDossier(dto.getNumDossier());
        dossier.setFkEmailUtilisateur(dto.getFkEmailUtilisateur());
        dossier.setDate(dto.getDate());
        dossier.setPatient(fetchPatientById(dto.getFkNumPatient()));
        return dossier;
    }

    private Patient fetchPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id " + id));
    }

    private UtilisateurDTO fetchUtilisateurByEmail(String email) {
        return utilisateurClient.getUtilisateurByEmail(email);
    }
}