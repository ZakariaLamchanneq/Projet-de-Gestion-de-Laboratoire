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
    public ResponseEntity<TestEpreuveDTO> addTestEpreuve(@RequestBody TestEpreuveDTO testEpreuveDTO){
        TestEpreuveDTO testEpreuveCreated = testEpreuveService.createTestEpreuve(testEpreuveDTO);
        return new ResponseEntity<>(testEpreuveCreated, HttpStatus.OK);
    }


    @GetMapping("/all")
    public ResponseEntity<List<TestEpreuveDTO>> getAllTestEpreuves(){
        List<TestEpreuveDTO> epreuveDTOList = testEpreuveService.getAllTestEpreuves();
        return new ResponseEntity<>(epreuveDTOList,HttpStatus.OK);
    }

    @GetMapping("/getEpreuve/{id}")
    public ResponseEntity<TestEpreuveDTO> getTestEpreuve(@PathVariable Long id){
        TestEpreuveDTO TestEpreuveDTO = testEpreuveService.getTestEpreuveById(id);
        return new ResponseEntity<>(TestEpreuveDTO,HttpStatus.OK);
    }

    @PutMapping("/updateTestEpreuve/{id}")
    public ResponseEntity<TestEpreuveDTO> updateTestEpreuve(@PathVariable Long id,@RequestBody TestEpreuveDTO testEpreuveDTO){
        TestEpreuveDTO testEpreuveDTOUpdated = testEpreuveService.updateTestEpreuve(id,testEpreuveDTO);
        return new ResponseEntity<>(testEpreuveDTOUpdated,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTestEpreuve(@PathVariable Long id){
        testEpreuveService.deleteTestEpreuve(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
