package org.labmaster.laboratoire.controller;

import lombok.RequiredArgsConstructor;
import org.labmaster.laboratoire.model.FullLaboratoireResponse;
import org.labmaster.laboratoire.model.Laboratoire;
import org.labmaster.laboratoire.model.LaboratoireDTO;
import org.labmaster.laboratoire.service.LaboratoireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/laboratoires")
@RequiredArgsConstructor
public class LaboratoireController {

    private final LaboratoireService laboratoireService;

    @PostMapping("/add")
    public ResponseEntity<?> createLaboratoire(@ModelAttribute LaboratoireDTO laboratoireDTO) {
        try {
            Laboratoire laboratoire = new Laboratoire();
            laboratoire.setNom(laboratoireDTO.getNom());
            laboratoire.setNrc(laboratoireDTO.getNrc());
            laboratoire.setActive(laboratoireDTO.getActive());
            laboratoire.setDateActivation(laboratoireDTO.getDateActivation());

            MultipartFile logoFile = laboratoireDTO.getLogo();
            if (logoFile != null && !logoFile.isEmpty()) {
                laboratoire.setLogo(logoFile.getBytes()); // Convert to byte[] and set
            }
//            else {
//                laboratoire.setLogo(null);
//            }

            Laboratoire savedLaboratoire = laboratoireService.createLaboratoire(laboratoire);
            return new ResponseEntity<>(savedLaboratoire, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Laboratoire>> getAllLaboratoires() {
        List<Laboratoire> laboratoires =  laboratoireService.getAllLaboratoires();
        return new ResponseEntity<>(laboratoires,HttpStatus.OK);
    }

    // Read/Search
    @GetMapping("/find/{id}")
    public ResponseEntity<Laboratoire> getLaboratoireById(@PathVariable Long id) {
        return laboratoireService.getLaboratoireById(id)
                .map(laboratoire -> new ResponseEntity<>(laboratoire, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping("/edit/{id}")
    public ResponseEntity<Laboratoire> updateLaboratoire(@PathVariable Long id, @ModelAttribute LaboratoireDTO laboratoireDTO) {
        try {
            Laboratoire laboratoire = new Laboratoire();
            laboratoire.setNom(laboratoireDTO.getNom());
            laboratoire.setNrc(laboratoireDTO.getNrc());
            laboratoire.setActive(laboratoireDTO.getActive());
            laboratoire.setDateActivation(laboratoireDTO.getDateActivation());

            MultipartFile logoFile = laboratoireDTO.getLogo();
            if (logoFile != null && !logoFile.isEmpty()) {
                laboratoire.setLogo(logoFile.getBytes());
            }

            Laboratoire updatedLaboratoire = laboratoireService.updateLaboratoire(id, laboratoire);
            return new ResponseEntity<>(updatedLaboratoire, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteLaboratoire(@PathVariable Long id) {
        laboratoireService.deleteLaboratoire(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("with-users/{laboratoire-id}")
    public ResponseEntity<FullLaboratoireResponse> getAllLaboratoires(@PathVariable("laboratoire-id") Long laboratoireId) {
        FullLaboratoireResponse laboratoiresWithUsers =  laboratoireService.getLaboratoiresWithUsers(laboratoireId);
        return new ResponseEntity<>(laboratoiresWithUsers,HttpStatus.OK);
    }
}


