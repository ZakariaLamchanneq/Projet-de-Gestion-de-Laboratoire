package patient.patient.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import patient.patient.dto.ExaminDTO;
import patient.patient.model.dossier.Dossier;
import patient.patient.model.examin.Examin;
import patient.patient.repository.DossierRepository;
import patient.patient.repository.ExaminRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExaminService {

    private final ExaminRepository examinRepository;
    private final DossierRepository dossierRepository;

    public List<ExaminDTO> getAll() {
        return examinRepository.findAll().stream().map(this::toDTO).toList();
    }

    public Optional<ExaminDTO> getById(Long id) {
        return examinRepository.findById(id).map(this::toDTO);
    }

    public ExaminDTO createExamin(ExaminDTO examinDTO) {
        Examin examin = toEntity(examinDTO);
        Examin savedExamin = examinRepository.save(examin);
        return toDTO(savedExamin);
    }

    public ExaminDTO updateExamin(Long id, ExaminDTO examinDTO) {
        Examin examin = examinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Examin not found with id " + id));

        examin.setFkIdEpreuve(examinDTO.getFkIdEpreuve());
        examin.setResultat(examinDTO.getResultat());

        Examin updatedExamin = examinRepository.save(examin);
        return toDTO(updatedExamin);
    }

    public boolean deleteExamin(Long id) {
        if (!examinRepository.existsById(id)) {
            return false;
        }
        examinRepository.deleteById(id);
        return true;
    }

    public List<ExaminDTO> getExaminsByDossierId(Long dossierId) {
        return examinRepository.findByDossierId(dossierId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    private ExaminDTO toDTO(Examin examin) {
        ExaminDTO dto = new ExaminDTO();
        dto.setId(examin.getId());
        dto.setFkNumDossier(examin.getDossier().getNumDossier());
        dto.setFkIdEpreuve(examin.getFkIdEpreuve());
        dto.setResultat(examin.getResultat());
        return dto;
    }

    private Examin toEntity(ExaminDTO dto) {
        Examin examin = new Examin();
        examin.setId(dto.getId());
        examin.setFkIdEpreuve(dto.getFkIdEpreuve());
        examin.setResultat(dto.getResultat());
        examin.setDossier(fetchDossierById(dto.getFkNumDossier()));
        return examin;
    }

    private Dossier fetchDossierById(Long id) {
        return dossierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dossier not found with id " + id));
    }
}