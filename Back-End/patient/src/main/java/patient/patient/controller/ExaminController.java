package patient.patient.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import patient.patient.dto.ExaminDTO;
import patient.patient.service.ExaminService;

import java.util.List;

@RestController
@RequestMapping("/api/examins")
@RequiredArgsConstructor
public class ExaminController {

    private final ExaminService examinService;

    @PostMapping("/add")
    public ResponseEntity<?> createExamin(@RequestBody ExaminDTO examinDTO) {
        try {
            ExaminDTO savedExamin = examinService.createExamin(examinDTO);
            return new ResponseEntity<>(savedExamin, HttpStatus.CREATED);
        } catch (Exception e) {
            return handleException(e, "Failed to create examin");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllExamins() {
        try {
            List<ExaminDTO> examins = examinService.getAll();
            return new ResponseEntity<>(examins, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve examins");
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getExaminById(@PathVariable Long id) {
        try {
            return examinService.getById(id)
                    .map(examinDTO -> new ResponseEntity<>(examinDTO, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return handleException(e, "Failed to retrieve examin with ID " + id);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateExamin(@PathVariable Long id, @RequestBody ExaminDTO examinDTO) {
        try {
            ExaminDTO updatedExamin = examinService.updateExamin(id, examinDTO);
            return new ResponseEntity<>(updatedExamin, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, "Failed to update examin with ID " + id);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteExamin(@PathVariable Long id) {
        try {
            boolean isDeleted = examinService.deleteExamin(id);
            if (isDeleted) {
                return ResponseEntity.noContent().build();
            } else {
                return new ResponseEntity<>("Examin not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return handleException(e, "Failed to delete examin with ID " + id);
        }
    }

    private ResponseEntity<String> handleException(Exception e, String message) {
        System.err.println(message + ": " + e.getMessage());
        e.printStackTrace();
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}