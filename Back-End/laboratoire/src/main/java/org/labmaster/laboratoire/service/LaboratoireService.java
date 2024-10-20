package org.labmaster.laboratoire.service;

import lombok.RequiredArgsConstructor;
import org.labmaster.laboratoire.client.UtilisateurClient;
import org.labmaster.laboratoire.model.FullLaboratoireResponse;
import org.labmaster.laboratoire.model.Laboratoire;
import org.labmaster.laboratoire.repository.LaboratoireRepository;
import org.labmaster.laboratoire.model.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LaboratoireService {

    private final LaboratoireRepository laboratoireRepository;
    private final UtilisateurClient utilisateurClient;
    public Laboratoire createLaboratoire(Laboratoire laboratoire) {
        return laboratoireRepository.save(laboratoire);
    }

    public List<Laboratoire> getAllLaboratoires() {
        return laboratoireRepository.findAll();
    }


    public FullLaboratoireResponse getLaboratoiresWithUsers(Long laboratoireId) {
        var laboraoire = laboratoireRepository.findById(laboratoireId).orElse(
                new Laboratoire("NOT_FOUND")
        );
        var utilisateurs = utilisateurClient.getUtilisateursByLaboratoire(laboratoireId) ;

        return FullLaboratoireResponse.builder()
                .nom(laboraoire.getNom())
                .nrc(laboraoire.getNrc())
                .logo(laboraoire.getLogo())
                .active(laboraoire.getActive())
                .dateActivation(laboraoire.getDateActivation())
                .utilisateurs(utilisateurs).build();
    }
}
