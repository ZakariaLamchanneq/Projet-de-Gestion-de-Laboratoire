package analyse.analyse.controller;

import analyse.analyse.dto.TestEpreuveDTO;
import analyse.analyse.service.TestEpreuveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testEpreuves")
@RequiredArgsConstructor
public class TestEpreuveController {

    private final TestEpreuveService testEpreuveService;

    @PostMapping("/add")
    public ResponseEntity<?> addEpreuve(@RequestBody TestEpreuveDTO testEpreuveDTO) {
        try {
            TestEpreuveDTO testEpreuveCreated = testEpreuveService.createTestEpreuve(testEpreuveDTO);
            return new ResponseEntity<>(testEpreuveCreated, HttpStatus.CREATED);
        } catch (Exception e) {
            return handleException(e, "Failed to create TestEpreuve");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllEpreuves() {
        try {
            List<TestEpreuveDTO> epreuveDTOList = testEpreuveService.getAllTestEpreuves();
            return new ResponseEntity<>(epreuveDTOList, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve TestEpreuves");
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getEpreuve(@PathVariable Long id) {
        try {
            return testEpreuveService.getTestEpreuveById(id)
                    .map(testEpreuveDTO -> new ResponseEntity<>(testEpreuveDTO, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve TestEpreuve with ID " + id);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateEpreuve(@PathVariable Long id, @RequestBody TestEpreuveDTO testEpreuveDTO) {
        try {
            TestEpreuveDTO updatedTestEpreuve = testEpreuveService.updateTestEpreuve(id, testEpreuveDTO);
            return new ResponseEntity<>(updatedTestEpreuve, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to update TestEpreuve with ID " + id);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEpreuve(@PathVariable Long id) {
        try {
            boolean isDeleted = testEpreuveService.deleteTestEpreuve(id);
            if (isDeleted) {
                return ResponseEntity.noContent().build();
            } else {
                return new ResponseEntity<>("TestEpreuve not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return handleException(e, "Failed to delete TestEpreuve with ID " + id);
        }
    }

    private ResponseEntity<String> handleException(Exception e, String message) {
        System.err.println(message + ": " + e.getMessage());
        e.printStackTrace();
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}