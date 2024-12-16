package org.labmaster.gateway;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UtilisateurClient utilisateurClient;

    // Clé secrète pour JWT, à stocker dans application.properties
    private static final String SECRET_KEY = "your-secure-secret-key";

    public AuthController(UtilisateurClient utilisateurClient) {
        this.utilisateurClient = utilisateurClient;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest request) {
        try {
            // Vérifier les informations d'identification via Feign
            ResponseEntity<UserResponse> response = utilisateurClient.verifyUser(request);

            // Log de la réponse
            System.out.println("Réponse du service utilisateurs : " + response);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                UserResponse user = response.getBody();

                // Génération du JWT
                String token = Jwts.builder()
                        .setSubject(user.getEmail())
                        .claim("role", user.getRole())
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 heures
                        .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                        .compact();

                return ResponseEntity.ok(new AuthResponse(token));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e) {
            e.printStackTrace(); // Log l'erreur complète
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during authentication");
        }
    }


}
