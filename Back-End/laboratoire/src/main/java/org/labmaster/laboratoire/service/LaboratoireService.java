package org.labmaster.laboratoire.service;

import lombok.RequiredArgsConstructor;
import org.labmaster.laboratoire.client.UtilisateurClient;
import org.labmaster.laboratoire.exception.ResourceNotFoundException;
import org.labmaster.laboratoire.model.FullLaboratoireResponse;
import org.labmaster.laboratoire.model.Laboratoire;
import org.labmaster.laboratoire.repository.LaboratoireRepository;
import org.labmaster.laboratoire.model.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LaboratoireService {

    private final LaboratoireRepository laboratoireRepository;
    private final UtilisateurClient utilisateurClient;

    // Create
    public Laboratoire createLaboratoire(Laboratoire laboratoire){
        return laboratoireRepository.save(laboratoire);
    }

    // Fetch all
    public List<Laboratoire> getAllLaboratoires() {
        return laboratoireRepository.findAll();
    }


    // Search by Id
    public Optional<Laboratoire> getLaboratoireById(Long id) {
        return laboratoireRepository.findById(id);
    }

    // Update
    public Laboratoire updateLaboratoire(Long id, Laboratoire laboratoireDetails) {
        Laboratoire laboratoire = laboratoireRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Laboratoire not found with id " + id));

        laboratoire.setNom(laboratoireDetails.getNom());
        laboratoire.setNrc(laboratoireDetails.getNrc());
        laboratoire.setActive(laboratoireDetails.getActive());
        laboratoire.setDateActivation(laboratoireDetails.getDateActivation());

        // Update the logo if it's provided
        if (laboratoireDetails.getLogo() != null) {
            laboratoire.setLogo(laboratoireDetails.getLogo());
        }

        return laboratoireRepository.save(laboratoire);
    }

    // Delete
    public void deleteLaboratoire(Long id) {
        if (!laboratoireRepository.existsById(id)) {
            throw new ResourceNotFoundException("Laboratoire not found with id " + id);
        }
        laboratoireRepository.deleteById(id);
    }

    // Find Laboratoire and its users by Id
    public FullLaboratoireResponse getLaboratoiresWithUsers(Long laboratoireId) {
        var laboraoire = laboratoireRepository.findById(laboratoireId).orElse(
                new Laboratoire("NOT_FOUND")
        );
        var utilisateurs = utilisateurClient.getUtilisateursByLaboratoire(laboratoireId);

        return FullLaboratoireResponse.builder()
                .nom(laboraoire.getNom())
                .nrc(laboraoire.getNrc())
                .logo(laboraoire.getLogo())
                .active(laboraoire.getActive())
                .dateActivation(laboraoire.getDateActivation())
                .utilisateurs(utilisateurs).build();
    }
}
