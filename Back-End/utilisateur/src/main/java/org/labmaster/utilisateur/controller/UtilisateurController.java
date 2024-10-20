package org.labmaster.utilisateur.controller;

import lombok.RequiredArgsConstructor;
import org.labmaster.utilisateur.model.Utilisateur;
import org.labmaster.utilisateur.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@RequiredArgsConstructor
public class UtilisateurController {
    @Autowired
    private final UtilisateurService utilisateurService;

    @PostMapping("/add")
    public ResponseEntity<?> createUtilisateur(@RequestBody Utilisateur utilisateur) {
        Utilisateur userCreated = utilisateurService.createUtilisateur(utilisateur);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Utilisateur>> getAllUtilisateurs() {
        List<Utilisateur> utilisateurs = utilisateurService.getAllUtilisateurs();
        return new ResponseEntity<>(utilisateurs, HttpStatus.OK);
    }

    @GetMapping("/laboratoire/{laboratoire-id}")
    public ResponseEntity<List<Utilisateur>> getAllUtilisateurs(@PathVariable("laboratoire-id") Long laboratoireId) {
        List<Utilisateur> utilisateurs = utilisateurService.getAllUtilisateursByLaboratoire(laboratoireId);
        return new ResponseEntity<>(utilisateurs, HttpStatus.OK);
    }

    // Implement update and delete methods
}