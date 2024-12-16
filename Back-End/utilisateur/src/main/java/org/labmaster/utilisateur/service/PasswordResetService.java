package org.labmaster.utilisateur.service;

import org.labmaster.utilisateur.repository.PasswordResetTokenRepository;
import org.labmaster.utilisateur.model.PasswordResetToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    public String createResetToken(String email) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setEmail(email);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(30)); // Token valid for 30 minutes
        tokenRepository.save(resetToken);
        return token;
    }

    public Optional<String> validateToken(String token) {
        return tokenRepository.findByToken(token)
                .filter(t -> !t.isExpired())  // Ensure token is not expired
                .map(PasswordResetToken::getEmail);  // Return the email if valid
    }

}
