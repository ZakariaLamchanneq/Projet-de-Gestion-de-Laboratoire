package analyse.analyse.service;

import analyse.analyse.dto.AnalyseDTO;
import analyse.analyse.model.Analyse;
import analyse.analyse.repository.AnalyseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnalyseService {

    @Autowired
    private AnalyseRepository analyseRepository;

    public AnalyseDTO createAnalyse (AnalyseDTO analyseDTO){
        Analyse analyse = convertToAnalyse(analyseDTO);
        analyseRepository.save(analyse);
        return  analyseDTO;
    }


    public List<AnalyseDTO> getAllAnalyses (){
        return analyseRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }







    public AnalyseDTO getAnalyseById (Long AnalyseId){
        Analyse analyse = analyseRepository.findById(AnalyseId)
                .orElseThrow(() -> new RuntimeException("Analyse introuvable"));

        return convertToDto(analyse);
    }

    public void deleteAnalyse (Long analyseId){
        analyseRepository.deleteById(analyseId);
    }




    public Analyse convertToAnalyse (AnalyseDTO analyseDTO){
        Analyse analyse = new Analyse();
        analyse.setId(analyseDTO.getId());
        analyse.setNom(analyseDTO.getNom());
        analyse.setDesciption(analyseDTO.getDesciption());
        analyse.setFkIdLaboratoire(analyseDTO.getFkIdLaboratoire());
        return analyse;
    }

    public AnalyseDTO convertToDto (Analyse analyse){
        AnalyseDTO analyseDTO = new AnalyseDTO();
        analyseDTO.setId(analyse.getId());
        analyseDTO.setNom(analyse.getNom());
        analyseDTO.setFkIdLaboratoire(analyse.getFkIdLaboratoire());
        analyseDTO.setDesciption(analyse.getDesciption());
        return analyseDTO ;
    }

}
