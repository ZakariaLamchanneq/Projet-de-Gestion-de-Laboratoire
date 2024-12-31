package org.labmaster.utilisateur.service;

import lombok.RequiredArgsConstructor;
import org.labmaster.utilisateur.model.Utilisateur;
import org.labmaster.utilisateur.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Utilisateur archiveUtilisateur(Long userId) {
        Utilisateur utilisateur = utilisateurRepository.findById(userId).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        utilisateur.setIsArchived(true);
        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur unarchiveUtilisateur(Long userId) {
        Utilisateur utilisateur = utilisateurRepository.findById(userId).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        utilisateur.setIsArchived(false);
        return utilisateurRepository.save(utilisateur);
    }

    public List<Utilisateur> getUtilisateursNonArchives() {
        return utilisateurRepository.findByIsArchivedFalse();
    }

    public List<Utilisateur> getUtilisateursArchives() {
        return utilisateurRepository.findByIsArchivedTrue();
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

    public Utilisateur verifyCredentials(String email, String password) {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findByEmail(email);

        if (utilisateur.isPresent() && utilisateur.get().getPassword().equals(password)) {
            return utilisateur.get();
        }

        throw new RuntimeException("Invalid credentials");
    }

    public boolean resetPassword(String email, String newPassword) {
        Optional<Utilisateur> userOpt = utilisateurRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            Utilisateur user = userOpt.get();
            // Set the new password (you should hash it before saving)
            user.setPassword(newPassword);  // You should hash this password using a secure hashing function
            utilisateurRepository.save(user);
            return true;
        } else {
            return false;
        }
    }

}
