package analyse.analyse.controller;

import analyse.analyse.dto.AnalyseDTO;
import analyse.analyse.service.AnalyseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analyses")
@RequiredArgsConstructor
public class AnalyseController {

    private final AnalyseService analyseService;

    @PostMapping("/add")
    public ResponseEntity<?> addAnalyse(@RequestBody AnalyseDTO analyseDTO) {
        try {
            AnalyseDTO analyseCreated = analyseService.createAnalyse(analyseDTO);
            return new ResponseEntity<>(analyseCreated, HttpStatus.CREATED);
        } catch (Exception e) {
            return handleException(e, "Failed to create Analyse");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllAnalyses() {
        try {
            List<AnalyseDTO> analyseDTOList = analyseService.getAllAnalyses();
            return new ResponseEntity<>(analyseDTOList, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve Analyses");
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getAnalyse(@PathVariable Long id) {
        try {
            return analyseService.getAnalyseById(id)
                    .map(analyseDTO -> new ResponseEntity<>(analyseDTO, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve Analyse with ID " + id);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateAnalyse(@PathVariable Long id, @RequestBody AnalyseDTO analyseDTO) {
        try {
            AnalyseDTO updatedAnalyse = analyseService.updateAnalyse(id, analyseDTO);
            return new ResponseEntity<>(updatedAnalyse, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to update Analyse with ID " + id);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAnalyse(@PathVariable Long id) {
        try {
            boolean isDeleted = analyseService.deleteAnalyse(id);
            if (isDeleted) {
                return ResponseEntity.noContent().build();
            } else {
                return new ResponseEntity<>("Analyse not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return handleException(e, "Failed to delete Analyse with ID " + id);
        }
    }

    @GetMapping("/laboratoire/{laboratoireId}")
    public ResponseEntity<?> getAnalysesByLaboratoireId(@PathVariable Long laboratoireId) {
        try {
            List<AnalyseDTO> analyses = analyseService.getAnalysesByLaboratoireId(laboratoireId);
            return new ResponseEntity<>(analyses, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve Analyses for Laboratoire with ID " + laboratoireId);
        }
    }

    private ResponseEntity<String> handleException(Exception e, String message) {
        System.err.println(message + ": " + e.getMessage());
        e.printStackTrace();
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}