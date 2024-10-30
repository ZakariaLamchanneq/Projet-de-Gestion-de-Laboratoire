package org.labmaster.laboratoire.controller;

import lombok.RequiredArgsConstructor;
import org.labmaster.laboratoire.model.FullLaboratoireResponse;
import org.labmaster.laboratoire.model.Laboratoire;
import org.labmaster.laboratoire.service.LaboratoireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/laboratoires")
@RequiredArgsConstructor
public class LaboratoireController {

    private final LaboratoireService laboratoireService;

    @PostMapping("/add")
    public ResponseEntity<?> createLaboratoire(@RequestBody Laboratoire laboratoire) {
        Laboratoire laboratoireCreated = laboratoireService.createLaboratoire(laboratoire);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Laboratoire> getLaboratoireById(@PathVariable Long id) {
        Laboratoire laboratoire = laboratoireService.findById(id);
        return ResponseEntity.ok(laboratoire);
    }

    @GetMapping("all")
    public ResponseEntity<List<Laboratoire>> getAllLaboratoires() {
        List<Laboratoire> laboratoires =  laboratoireService.getAllLaboratoires();
        return new ResponseEntity<>(laboratoires,HttpStatus.OK);
    }

    @GetMapping("with-users/{laboratoire-id}")
    public ResponseEntity<FullLaboratoireResponse> getAllLaboratoires(@PathVariable("laboratoire-id") Long laboratoireId) {
        FullLaboratoireResponse laboratoiresWithUsers =  laboratoireService.getLaboratoiresWithUsers(laboratoireId);
        return new ResponseEntity<>(laboratoiresWithUsers,HttpStatus.OK);
    }

    // Implement update and delete methods
}


