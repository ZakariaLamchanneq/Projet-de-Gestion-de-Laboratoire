package analyse.analyse.service;

import analyse.analyse.dto.TestEpreuveDTO;
import analyse.analyse.model.TestEpreuve;
import analyse.analyse.repository.TestEpreuveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestEpreuveService {

    @Autowired
    private TestEpreuveRepository TestEpreuveRepository;

    public TestEpreuveDTO createTestEpreuve (TestEpreuveDTO testEpreuveDTO){
        TestEpreuve TestEpreuve = convertToTestEpreuve(testEpreuveDTO);
        TestEpreuveRepository.save(TestEpreuve);
        return  testEpreuveDTO;
    }


    public List<TestEpreuveDTO> getAllTestEpreuves (){
        return TestEpreuveRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    public TestEpreuveDTO getTestEpreuveById (Long testEpreuveId){
        TestEpreuve testEpreuve = TestEpreuveRepository.findById(testEpreuveId)
                .orElseThrow(() -> new RuntimeException("Test Epreuve introuvable"));

        return convertToDto(testEpreuve);
    }

    public void deleteTestEpreuve (Long testEpreuveId){
        TestEpreuveRepository.deleteById(testEpreuveId);
    }




    public TestEpreuve convertToTestEpreuve (TestEpreuveDTO testEpreuveDTO){
        TestEpreuve testEpreuve = new TestEpreuve();
        testEpreuve.setId(testEpreuveDTO.getId());
        testEpreuve.setDetails(testEpreuveDTO.getDetails());
        testEpreuve.setNomEpreuve(testEpreuveDTO.getNomEpreuve());
        testEpreuve.setUniteDeReference(testEpreuveDTO.getUniteDeReference());
        testEpreuve.setIntervalMinDeReference(testEpreuveDTO.getIntervalMinDeReference());
        testEpreuve.setIntervalMaxDeReference(testEpreuveDTO.getIntervalMaxDeReference());
        return testEpreuve;
    }

    public TestEpreuveDTO convertToDto (TestEpreuve testEpreuve){
        TestEpreuveDTO testEpreuveDTO = new TestEpreuveDTO();
        testEpreuveDTO.setId(testEpreuve.getId());
        testEpreuveDTO.setNomEpreuve(testEpreuve.getNomEpreuve());
        testEpreuveDTO.setUniteDeReference(testEpreuve.getUniteDeReference());
        testEpreuveDTO.setIntervalMinDeReference(testEpreuve.getIntervalMinDeReference());
        testEpreuveDTO.setIntervalMaxDeReference(testEpreuve.getIntervalMaxDeReference());
        return testEpreuveDTO ;
    }

}
