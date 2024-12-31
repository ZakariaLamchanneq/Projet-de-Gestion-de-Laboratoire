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
import java.util.stream.Collectors;

@Service
public class EpreuveService {
    
    @Autowired
    private EpreuveRepository epreuveRepository;

    @Autowired
    private AnalyseRepository analyseRepository;


    @Autowired
    private TestEpreuveRepository testEpreuveRepository;


    public EpreuveDTO createEpreuve (EpreuveDTO epreuveDTO){
        Epreuve Epreuve = convertToEpreuve(epreuveDTO);
        epreuveRepository.save(Epreuve);
        return  epreuveDTO;
    }


    public List<EpreuveDTO> getAllEpreuves (){
        return epreuveRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }







    public EpreuveDTO getEpreuveById (Long EpreuveId){
        Epreuve epreuve = epreuveRepository.findById(EpreuveId)
                .orElseThrow(() -> new RuntimeException("Epreuve introuvable"));

        return convertToDto(epreuve);
    }

    public void deleteEpreuve (Long EpreuveId){
        epreuveRepository.deleteById(EpreuveId);
    }



    public EpreuveDTO updateEpreuve(Long id, EpreuveDTO epreuveDTO) {
        Epreuve epreuve = epreuveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("epreuve introuvable"));

        epreuve.setId(epreuveDTO.getId());
        epreuve.setNom(epreuveDTO.getNom());
        epreuve.setIdDossier(epreuveDTO.getIdDossier());
        epreuve.setResultat(epreuveDTO.getResultat());
        epreuve.setAnalyse(fetchAnalyseById(epreuveDTO.getFkIdAnalyse()));
        epreuve.setTestEpreuve(fetchTestEpreuveById(epreuveDTO.getFkIdTestEpreuve()));
        epreuve = epreuveRepository.save(epreuve);
        return convertToDto(epreuve);
    }



    public Epreuve convertToEpreuve (EpreuveDTO epreuveDTO){
        Epreuve epreuve = new Epreuve();
        epreuve.setId(epreuveDTO.getId());
        epreuve.setNom(epreuveDTO.getNom());
        epreuve.setIdDossier(epreuveDTO.getIdDossier());
        epreuve.setResultat(epreuveDTO.getResultat());

        if (epreuveDTO.getFkIdAnalyse() != null) {
            epreuve.setAnalyse(fetchAnalyseById(epreuveDTO.getFkIdAnalyse()));
        }

        if (epreuveDTO.getFkIdTestEpreuve() != null) {
            epreuve.setTestEpreuve(fetchTestEpreuveById(epreuveDTO.getFkIdTestEpreuve()));
        }


        return epreuve;
    }

    public EpreuveDTO convertToDto (Epreuve epreuve){
        EpreuveDTO epreuveDTO = new EpreuveDTO();
        epreuveDTO.setId(epreuve.getId());
        epreuveDTO.setNom(epreuve.getNom());
        epreuveDTO.setResultat(epreuve.getResultat());
        epreuveDTO.setIdDossier(epreuve.getIdDossier());
        if (epreuve.getAnalyse() != null) {
            epreuveDTO.setFkIdAnalyse(epreuve.getAnalyse().getId());
        }
        if (epreuve.getTestEpreuve() != null) {
            epreuveDTO.setFkIdTestEpreuve(epreuve.getTestEpreuve().getId());
        }
        return epreuveDTO ;
    }


    // Placeholder methods to fetch related entities
    private Analyse fetchAnalyseById(Long id) {
        return analyseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("analyse not found with id " + id));
    }


    private TestEpreuve fetchTestEpreuveById(Long id) {
        return testEpreuveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("test Epreuve not found with id " + id));
    }
}
