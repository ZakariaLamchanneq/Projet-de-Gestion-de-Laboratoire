package org.labmaster.utilisateur.controller;

import lombok.RequiredArgsConstructor;
import org.labmaster.utilisateur.model.LoginRequest;
import org.labmaster.utilisateur.model.PasswordResetRequest;
import org.labmaster.utilisateur.model.UserResponse;
import org.labmaster.utilisateur.model.Utilisateur;
import org.labmaster.utilisateur.repository.UtilisateurRepository;
import org.labmaster.utilisateur.service.EmailService;
import org.labmaster.utilisateur.service.PasswordResetService;
import org.labmaster.utilisateur.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/utilisateurs")
@RequiredArgsConstructor
public class UtilisateurController {
    @Autowired
    private final UtilisateurService utilisateurService;
    @Autowired
    private final UtilisateurRepository utilisateurRepository;


    @Autowired
    private PasswordResetService resetService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest resetRequest) {
        Optional<String> emailOpt = resetService.validateToken(resetRequest.getToken());

        if (emailOpt.isPresent()) {
            String email = emailOpt.get();

            // Call the service to reset the password for the user with this email
            boolean passwordReset = utilisateurService.resetPassword(email, resetRequest.getNewPassword());

            if (passwordReset) {
                return ResponseEntity.ok(Collections.singletonMap("message", "Password successfully reset."));
            } else {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Failed to reset password."));
            }
        } else {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid or expired token."));
        }
    }




    @PostMapping("/request")
    public ResponseEntity<?> requestReset(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Email is required.")); // JSON format
        }

        String token = resetService.createResetToken(email);
        Boolean emailSent = emailService.sendResetEmail(email, token);

        if (emailSent) {
            return ResponseEntity.ok(Collections.singletonMap("message", "Reset link sent to email.")); // Return as JSON object
        } else {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Email not found in the database.")); // Return as JSON object
        }
    }




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
            response.setLaboratoireId(utilisateur.getLaboratoireId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/non-archives")
    public ResponseEntity<List<Utilisateur>> getUtilisateursNonArchives() {
        List<Utilisateur> utilisateurs = utilisateurService.getUtilisateursNonArchives();

        return new ResponseEntity<>(utilisateurs, HttpStatus.OK);

    }

    @GetMapping("/archives")
    public ResponseEntity<List<Utilisateur>> getUtilisateursArchives() {
        List<Utilisateur> utilisateurs = utilisateurService.getUtilisateursArchives();
        return new ResponseEntity<>(utilisateurs, HttpStatus.OK);
    }

    @PutMapping("/{id}/archive")
    public ResponseEntity<Utilisateur> archiveUtilisateur(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurService.archiveUtilisateur(id);

        return new ResponseEntity<>(utilisateur, HttpStatus.OK);
    }

    @PutMapping("/{id}/unarchive")
    public ResponseEntity<Utilisateur> unarchiveUtilisateur(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurService.unarchiveUtilisateur(id);
        return new ResponseEntity<>(utilisateur, HttpStatus.OK);
    }

}