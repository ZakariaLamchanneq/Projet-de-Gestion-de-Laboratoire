package analyse.analyse.service;

import analyse.analyse.dto.AnalyseDTO;
import analyse.analyse.model.Analyse;
import analyse.analyse.repository.AnalyseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnalyseService {

    @Autowired
    private AnalyseRepository analyseRepository;

    public List<AnalyseDTO> getAllAnalyses() {
        return analyseRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Optional<AnalyseDTO> getAnalyseById(Long id) {
        return analyseRepository.findById(id).map(this::convertToDto);
    }

    public AnalyseDTO createAnalyse(AnalyseDTO analyseDTO) {
        Analyse analyse = convertToAnalyse(analyseDTO);
        Analyse savedAnalyse = analyseRepository.save(analyse);
        return convertToDto(savedAnalyse);
    }

    public AnalyseDTO updateAnalyse(Long id, AnalyseDTO analyseDTO) {
        Analyse analyse = analyseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Analyse not found with id " + id));

        analyse.setNom(analyseDTO.getNom());
        analyse.setDescription(analyseDTO.getDescription());
        analyse.setFkIdLaboratoire(analyseDTO.getFkIdLaboratoire());

        Analyse updatedAnalyse = analyseRepository.save(analyse);
        return convertToDto(updatedAnalyse);
    }

    public boolean deleteAnalyse(Long id) {
        if (!analyseRepository.existsById(id)) {
            return false;
        }
        analyseRepository.deleteById(id);
        return true;
    }

    public List<AnalyseDTO> getAnalysesByLaboratoireId(Long laboratoireId) {
        return analyseRepository.findByFkIdLaboratoire(laboratoireId).stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private AnalyseDTO convertToDto(Analyse analyse) {
        AnalyseDTO dto = new AnalyseDTO();
        dto.setId(analyse.getId());
        dto.setNom(analyse.getNom());
        dto.setDescription(analyse.getDescription());
        dto.setFkIdLaboratoire(analyse.getFkIdLaboratoire());
        return dto;
    }

    private Analyse convertToAnalyse(AnalyseDTO dto) {
        Analyse analyse = new Analyse();
        analyse.setId(dto.getId());
        analyse.setNom(dto.getNom());
        analyse.setDescription(dto.getDescription());
        analyse.setFkIdLaboratoire(dto.getFkIdLaboratoire());
        return analyse;
    }
}