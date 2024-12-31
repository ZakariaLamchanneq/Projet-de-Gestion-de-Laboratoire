package org.labmaster.utilisateur.repository;

import org.labmaster.utilisateur.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    List<Utilisateur> findAllByLaboratoireId(Long laboratoireId);
    Optional<Utilisateur> findByEmail(String email);

    List<Utilisateur> findByIsArchivedFalse();

    List<Utilisateur> findByIsArchivedTrue();
}

