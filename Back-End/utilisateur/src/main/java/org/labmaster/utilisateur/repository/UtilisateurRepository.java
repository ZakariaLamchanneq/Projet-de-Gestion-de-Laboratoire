package org.labmaster.utilisateur.repository;

import org.labmaster.utilisateur.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    List<Utilisateur> findAllByLaboratoireId(Long laboratoireId);
}

