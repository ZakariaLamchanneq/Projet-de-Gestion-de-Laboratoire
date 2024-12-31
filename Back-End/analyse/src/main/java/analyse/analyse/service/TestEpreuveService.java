package analyse.analyse.service;

import analyse.analyse.dto.TestEpreuveDTO;
import analyse.analyse.model.TestEpreuve;
import analyse.analyse.repository.TestEpreuveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TestEpreuveService {

    @Autowired
    private TestEpreuveRepository testEpreuveRepository;

    public List<TestEpreuveDTO> getAllTestEpreuves() {
        return testEpreuveRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Optional<TestEpreuveDTO> getTestEpreuveById(Long id) {
        return testEpreuveRepository.findById(id).map(this::convertToDto);
    }

    public TestEpreuveDTO createTestEpreuve(TestEpreuveDTO testEpreuveDTO) {
        TestEpreuve testEpreuve = convertToTestEpreuve(testEpreuveDTO);
        TestEpreuve savedTestEpreuve = testEpreuveRepository.save(testEpreuve);
        return convertToDto(savedTestEpreuve);
    }

    public TestEpreuveDTO updateTestEpreuve(Long id, TestEpreuveDTO testEpreuveDTO) {
        TestEpreuve testEpreuve = testEpreuveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TestEpreuve not found with id " + id));

        testEpreuve.setNomEpreuve(testEpreuveDTO.getNomTest());
        testEpreuve.setIntervalMinDeReference(testEpreuveDTO.getIntervalMinDeReference());
        testEpreuve.setIntervalMaxDeReference(testEpreuveDTO.getIntervalMaxDeReference());
        testEpreuve.setUniteDeReference(testEpreuveDTO.getUniteDeReference());
        testEpreuve.setDetails(testEpreuveDTO.getDetails());

        TestEpreuve updatedTestEpreuve = testEpreuveRepository.save(testEpreuve);
        return convertToDto(updatedTestEpreuve);
    }

    public boolean deleteTestEpreuve(Long id) {
        if (!testEpreuveRepository.existsById(id)) {
            return false;
        }
        testEpreuveRepository.deleteById(id);
        return true;
    }

    private TestEpreuveDTO convertToDto(TestEpreuve testEpreuve) {
        TestEpreuveDTO dto = new TestEpreuveDTO();
        dto.setId(testEpreuve.getId());
        dto.setNomTest(testEpreuve.getNomEpreuve());
        dto.setIntervalMinDeReference(testEpreuve.getIntervalMinDeReference());
        dto.setIntervalMaxDeReference(testEpreuve.getIntervalMaxDeReference());
        dto.setUniteDeReference(testEpreuve.getUniteDeReference());
        dto.setDetails(testEpreuve.getDetails());
        return dto;
    }

    private TestEpreuve convertToTestEpreuve(TestEpreuveDTO dto) {
        TestEpreuve testEpreuve = new TestEpreuve();
        testEpreuve.setId(dto.getId());
        testEpreuve.setNomEpreuve(dto.getNomTest());
        testEpreuve.setIntervalMinDeReference(dto.getIntervalMinDeReference());
        testEpreuve.setIntervalMaxDeReference(dto.getIntervalMaxDeReference());
        testEpreuve.setUniteDeReference(dto.getUniteDeReference());
        testEpreuve.setDetails(dto.getDetails());
        return testEpreuve;
    }
}