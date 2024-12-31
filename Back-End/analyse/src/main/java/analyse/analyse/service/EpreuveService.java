package analyse.analyse.service;

import analyse.analyse.dto.EpreuveDTO;
import analyse.analyse.model.Analyse;
import analyse.analyse.model.Epreuve;
import analyse.analyse.model.TestEpreuve;
import analyse.analyse.repository.AnalyseRepository;
import analyse.analyse.repository.EpreuveRepository;
import analyse.analyse.repository.TestEpreuveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EpreuveService {

    @Autowired
    private EpreuveRepository epreuveRepository;

    @Autowired
    private TestEpreuveRepository testEpreuveRepository;

    @Autowired
    private AnalyseRepository analyseRepository;

    public List<EpreuveDTO> getAllEpreuves() {
        return epreuveRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Optional<EpreuveDTO> getEpreuveById(Long id) {
        return epreuveRepository.findById(id).map(this::convertToDto);
    }

    public EpreuveDTO createEpreuve(EpreuveDTO epreuveDTO) {
        Epreuve epreuve = convertToEpreuve(epreuveDTO);
        Epreuve savedEpreuve = epreuveRepository.save(epreuve);
        return convertToDto(savedEpreuve);
    }

    public EpreuveDTO updateEpreuve(Long id, EpreuveDTO epreuveDTO) {
        Epreuve epreuve = epreuveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Epreuve not found with id " + id));

        epreuve.setNom(epreuveDTO.getNom());
        epreuve.setTestEpreuve(convertToTestEpreuve(epreuveDTO.getFkIdTestEpreuve()));
        epreuve.setAnalyse(convertToAnalyse(epreuveDTO.getFkIdAnalyse()));

        Epreuve updatedEpreuve = epreuveRepository.save(epreuve);
        return convertToDto(updatedEpreuve);
    }

    public boolean deleteEpreuve(Long id) {
        if (!epreuveRepository.existsById(id)) {
            return false;
        }
        epreuveRepository.deleteById(id);
        return true;
    }

    public List<EpreuveDTO> getEpreuvesByAnalyseId(Long analyseId) {
        return epreuveRepository.findByAnalyseId(analyseId).stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private EpreuveDTO convertToDto(Epreuve epreuve) {
        EpreuveDTO dto = new EpreuveDTO();
        dto.setId(epreuve.getId());
        dto.setNom(epreuve.getNom());
        dto.setFkIdTestEpreuve(epreuve.getTestEpreuve().getId());
        dto.setFkIdAnalyse(epreuve.getAnalyse().getId());
        return dto;
    }

    private Epreuve convertToEpreuve(EpreuveDTO dto) {
        Epreuve epreuve = new Epreuve();
        epreuve.setId(dto.getId());
        epreuve.setNom(dto.getNom());
        epreuve.setTestEpreuve(convertToTestEpreuve(dto.getFkIdTestEpreuve()));
        epreuve.setAnalyse(convertToAnalyse(dto.getFkIdAnalyse()));
        return epreuve;
    }

    private TestEpreuve convertToTestEpreuve(Long id) {
        return testEpreuveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TestEpreuve not found with id " + id));
    }

    private Analyse convertToAnalyse(Long id) {
        return analyseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Analyse not found with id " + id));
    }
}