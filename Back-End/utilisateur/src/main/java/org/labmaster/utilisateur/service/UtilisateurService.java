package org.labmaster.utilisateur.service;

import lombok.RequiredArgsConstructor;
import org.labmaster.utilisateur.model.Utilisateur;
import org.labmaster.utilisateur.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class UtilisateurService {
    private final UtilisateurRepository utilisateurRepository;

    public Utilisateur createUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    public List<Utilisateur> getAllUtilisateursByLaboratoire(Long laboratoireId) {
        return utilisateurRepository.findAllByLaboratoireId(laboratoireId);
    }
}
