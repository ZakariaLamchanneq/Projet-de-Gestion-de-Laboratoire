package org.labmaster.utilisateur.service;

import lombok.RequiredArgsConstructor;
import org.labmaster.utilisateur.model.Utilisateur;
import org.labmaster.utilisateur.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public void deleteUtilisateurById(Long utilisateurId) {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(utilisateurId);
        if (utilisateur.isPresent()) {
            utilisateurRepository.deleteById(utilisateurId);
        } else {
            throw new RuntimeException("Utilisateur with ID " + utilisateurId + " not found.");
        }
    }

    public Utilisateur updateUtilisateur(Long utilisateurId, Utilisateur updatedUser) {
        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findById(utilisateurId);
        if (utilisateurOpt.isPresent()) {
            Utilisateur utilisateur = utilisateurOpt.get();
            utilisateur.setEmail(updatedUser.getEmail());
            utilisateur.setNomComplet(updatedUser.getNomComplet());
            utilisateur.setProfession(updatedUser.getProfession());
            utilisateur.setNumTel(updatedUser.getNumTel());
            utilisateur.setRole(updatedUser.getRole());
            return utilisateurRepository.save(utilisateur);
        } else {
            throw new RuntimeException("Utilisateur with ID " + utilisateurId + " not found.");
        }
    }


    public Optional<Utilisateur> getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id);
    }
}
