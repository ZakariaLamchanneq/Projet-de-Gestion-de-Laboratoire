package com.gestionlabo.controller;

import com.gestionlabo.model.Laboratoire;
import com.gestionlabo.model.Utilisateur;
import com.gestionlabo.repository.LaboratoireRepository;
import com.gestionlabo.repository.UtilisateurRepository;
import com.gestionlabo.service.LaboratoireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/laboratoires")
public class LaboratoireController {
    @Autowired
    private LaboratoireService laboratoireService;

    @PostMapping("/add")
    public ResponseEntity<?> createLaboratoire(@RequestBody Laboratoire laboratoire) {
        Laboratoire laboratoireCreated = laboratoireService.createLaboratoire(laboratoire);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("all")
    public ResponseEntity<List<Laboratoire>> getAllLaboratoires() {
        List<Laboratoire> laboratoires =  laboratoireService.getAllLaboratoires();
        return new ResponseEntity<>(laboratoires,HttpStatus.OK);
    }

    // Implement update and delete methods
}


