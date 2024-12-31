package analyse.analyse.service;

import analyse.analyse.dto.TestEpreuveDTO;
import analyse.analyse.model.Analyse;
import analyse.analyse.model.Epreuve;
import analyse.analyse.model.TestEpreuve;
import analyse.analyse.repository.EpreuveRepository;
import analyse.analyse.repository.TestEpreuveRepository;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestEpreuveService {

    @Autowired
    private TestEpreuveRepository TestEpreuveRepository;
    @Autowired
    private EpreuveRepository epreuveRepository;

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

    public TestEpreuveDTO updateTestEpreuve(Long id, TestEpreuveDTO testEpreuveDto) {
        TestEpreuve testEpreuve = TestEpreuveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test epreuve introuvable"));
        testEpreuve.setId(testEpreuveDto.getId());
        testEpreuve.setDetails(testEpreuveDto.getDetails());
        testEpreuve.setNomTest(testEpreuveDto.getNomTest());
        testEpreuve.setIntervalMaxDeReference(testEpreuveDto.getIntervalMaxDeReference());
        testEpreuve.setIntervalMinDeReference(testEpreuveDto.getIntervalMinDeReference());
        testEpreuve.setUniteDeReference(testEpreuveDto.getUniteDeReference());
        testEpreuve.setEpreuve(fetchEpreuveById(testEpreuveDto.getFkIdEpreuve()));
        TestEpreuveRepository.save(testEpreuve);
        return convertToDto(testEpreuve);
    }

    public void deleteTestEpreuve (Long testEpreuveId){
        TestEpreuveRepository.deleteById(testEpreuveId);
    }




    public TestEpreuve convertToTestEpreuve (TestEpreuveDTO testEpreuveDTO){
        TestEpreuve testEpreuve = new TestEpreuve();
        testEpreuve.setId(testEpreuveDTO.getId());
        testEpreuve.setDetails(testEpreuveDTO.getDetails());
        testEpreuve.setNomTest(testEpreuveDTO.getNomTest());
        testEpreuve.setUniteDeReference(testEpreuveDTO.getUniteDeReference());
        testEpreuve.setIntervalMinDeReference(testEpreuveDTO.getIntervalMinDeReference());
        testEpreuve.setIntervalMaxDeReference(testEpreuveDTO.getIntervalMaxDeReference());
        testEpreuve.setFkIdEpreuve(testEpreuveDTO.getFkIdEpreuve());
        return testEpreuve;
    }

    public TestEpreuveDTO convertToDto (TestEpreuve testEpreuve){
        TestEpreuveDTO testEpreuveDTO = new TestEpreuveDTO();
        testEpreuveDTO.setId(testEpreuve.getId());
        testEpreuveDTO.setNomTest(testEpreuve.getNomTest());
        testEpreuveDTO.setUniteDeReference(testEpreuve.getUniteDeReference());
        testEpreuveDTO.setIntervalMinDeReference(testEpreuve.getIntervalMinDeReference());
        testEpreuveDTO.setIntervalMaxDeReference(testEpreuve.getIntervalMaxDeReference());
        testEpreuveDTO.setFkIdEpreuve(testEpreuve.getFkIdEpreuve());
        return testEpreuveDTO ;
    }


    private Epreuve fetchEpreuveById(Long id) {
        return epreuveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("epreuve not found with id " + id));
    }

}
