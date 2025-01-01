package analyse.analyse.controller;

import analyse.analyse.dto.EpreuveDTO;
import analyse.analyse.service.EpreuveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/epreuves")
@RequiredArgsConstructor
public class EpreuveController {

    private final EpreuveService epreuveService;

    @PostMapping("/add")
    public ResponseEntity<?> addEpreuve(@RequestBody EpreuveDTO epreuveDTO) {
        try {
            EpreuveDTO epreuveCreated = epreuveService.createEpreuve(epreuveDTO);
            return new ResponseEntity<>(epreuveCreated, HttpStatus.CREATED);
        } catch (Exception e) {
            return handleException(e, "Failed to create Epreuve");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllEpreuves() {
        try {
            List<EpreuveDTO> epreuveDTOList = epreuveService.getAllEpreuves();
            return new ResponseEntity<>(epreuveDTOList, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve Epreuves");
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getEpreuve(@PathVariable Long id) {
        try {
            return epreuveService.getEpreuveById(id)
                    .map(epreuveDTO -> new ResponseEntity<>(epreuveDTO, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve Epreuve with ID " + id);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateEpreuve(@PathVariable Long id, @RequestBody EpreuveDTO epreuveDTO) {
        try {
            EpreuveDTO updatedEpreuve = epreuveService.updateEpreuve(id, epreuveDTO);
            return new ResponseEntity<>(updatedEpreuve, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to update Epreuve with ID " + id);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEpreuve(@PathVariable Long id) {
        try {
            boolean isDeleted = epreuveService.deleteEpreuve(id);
            if (isDeleted) {
                return ResponseEntity.noContent().build();
            } else {
                return new ResponseEntity<>("Epreuve not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return handleException(e, "Failed to delete Epreuve with ID " + id);
        }
    }

    @GetMapping("/analyse/{analyseId}")
    public ResponseEntity<?> getEpreuvesByAnalyseId(@PathVariable Long analyseId) {
        try {
            List<EpreuveDTO> epreuves = epreuveService.getEpreuvesByAnalyseId(analyseId);
            return new ResponseEntity<>(epreuves, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve Epreuves for Analyse with ID " + analyseId);
        }
    }

    private ResponseEntity<String> handleException(Exception e, String message) {
        System.err.println(message + ": " + e.getMessage());
        e.printStackTrace();
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}