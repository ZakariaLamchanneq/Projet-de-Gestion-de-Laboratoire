package analyse.analyse.controller;

import analyse.analyse.dto.TestEpreuveDTO;
import analyse.analyse.service.TestEpreuveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testEpreuves")
public class TestEpreuveController {

    @Autowired
    private TestEpreuveService testEpreuveService;

    @PostMapping("/add")
    public ResponseEntity<TestEpreuveDTO> addEpreuve(@RequestBody TestEpreuveDTO testEpreuveDTO){
        TestEpreuveDTO testEpreuveCreated = testEpreuveService.createTestEpreuve(testEpreuveDTO);
        return new ResponseEntity<>(testEpreuveCreated, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TestEpreuveDTO>> getAllEpreuves(){
        List<TestEpreuveDTO> epreuveDTOList = testEpreuveService.getAllTestEpreuves();
        return new ResponseEntity<>(epreuveDTOList, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<TestEpreuveDTO> getEpreuve(@PathVariable Long id){
        TestEpreuveDTO testEpreuveDTO = testEpreuveService.getTestEpreuveById(id).orElse(null);
        return new ResponseEntity<>(testEpreuveDTO, HttpStatus.OK);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<TestEpreuveDTO> updateEpreuve(@PathVariable Long id, @RequestBody TestEpreuveDTO testEpreuveDTO) {
        TestEpreuveDTO updatedTestEpreuve = testEpreuveService.updateTestEpreuve(id, testEpreuveDTO);
        return new ResponseEntity<>(updatedTestEpreuve, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEpreuve(@PathVariable Long id){
        testEpreuveService.deleteTestEpreuve(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}