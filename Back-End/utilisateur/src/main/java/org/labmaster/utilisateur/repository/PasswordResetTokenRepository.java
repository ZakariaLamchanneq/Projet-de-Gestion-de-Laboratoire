package org.labmaster.utilisateur.repository;

import org.labmaster.utilisateur.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken,Long> {

    Optional<PasswordResetToken> findByToken (String token );
    Optional<PasswordResetToken> findByEmail (String email);
}
