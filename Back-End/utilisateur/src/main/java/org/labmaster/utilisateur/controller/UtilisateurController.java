package org.labmaster.utilisateur.controller;

import lombok.RequiredArgsConstructor;
import org.labmaster.utilisateur.model.LoginRequest;
import org.labmaster.utilisateur.model.UserResponse;
import org.labmaster.utilisateur.model.Utilisateur;
import org.labmaster.utilisateur.repository.UtilisateurRepository;
import org.labmaster.utilisateur.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/utilisateurs")
@RequiredArgsConstructor
public class UtilisateurController {
    @Autowired
    private final UtilisateurService utilisateurService;
    @Autowired
    private final UtilisateurRepository utilisateurRepository;

    @PostMapping("/add")
    public ResponseEntity<?> createUtilisateur(@RequestBody Utilisateur utilisateur) {
        Utilisateur userCreated = utilisateurService.createUtilisateur(utilisateur);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<Optional<Utilisateur>> getUtilisateur(@PathVariable Long id) {
        Optional<Utilisateur> utilisateur = utilisateurService.getUtilisateurById(id);
        return new ResponseEntity<>(utilisateur, HttpStatus.OK);
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

    @PutMapping("/updateUtilisateur/{utilisateurId}")
    public ResponseEntity<Utilisateur> updateUtilisateur(@PathVariable Long utilisateurId, @RequestBody Utilisateur updatedUser) {
        try {
            Utilisateur utilisateur = utilisateurService.updateUtilisateur(utilisateurId, updatedUser);
            return ResponseEntity.ok(utilisateur);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        try {
            utilisateurService.deleteUtilisateurById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).build();
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody LoginRequest request) {
        try {
            Utilisateur utilisateur = utilisateurService.verifyCredentials(request.getEmail(), request.getPassword());

            UserResponse response = new UserResponse();
            response.setEmail(utilisateur.getEmail());
            response.setRole(utilisateur.getRole());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


}