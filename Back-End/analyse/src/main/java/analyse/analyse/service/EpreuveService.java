package analyse.analyse.service;

import analyse.analyse.dto.EpreuveDTO;
import analyse.analyse.model.Epreuve;
import analyse.analyse.repository.EpreuveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EpreuveService {
    
    @Autowired
    private EpreuveRepository epreuveRepository;

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
        Epreuve Epreuve = epreuveRepository.findById(EpreuveId)
                .orElseThrow(() -> new RuntimeException("Epreuve introuvable"));

        return convertToDto(Epreuve);
    }

    public void deleteEpreuve (Long EpreuveId){
        epreuveRepository.deleteById(EpreuveId);
    }




    public Epreuve convertToEpreuve (EpreuveDTO EpreuveDTO){
        Epreuve Epreuve = new Epreuve();
        Epreuve.setId(EpreuveDTO.getId());
        Epreuve.setNom(EpreuveDTO.getNom());
        Epreuve.setFkIdDossier(EpreuveDTO.getFkIdDossier());
        Epreuve.setFkIdDossier(EpreuveDTO.getFkIdDossier());
        Epreuve.setResultat(EpreuveDTO.getResultat());

        return Epreuve;
    }

    public EpreuveDTO convertToDto (Epreuve Epreuve){
        EpreuveDTO EpreuveDTO = new EpreuveDTO();
        EpreuveDTO.setId(Epreuve.getId());
        EpreuveDTO.setNom(Epreuve.getNom());
        EpreuveDTO.setFkIdDossier(Epreuve.getFkIdDossier());
        EpreuveDTO.setFkIdDossier(Epreuve.getFkIdDossier());
        EpreuveDTO.setResultat(Epreuve.getResultat());
        return EpreuveDTO ;
    }
}
