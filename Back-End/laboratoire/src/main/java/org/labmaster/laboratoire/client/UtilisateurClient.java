package org.labmaster.laboratoire.client;

import org.labmaster.laboratoire.dto.laboratoire.Utilisateur;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "utilisateur-microservice", url = "${application.config.utilisateurs-url}")
public interface UtilisateurClient {

    @GetMapping("/laboratoire/{laboratoire-id}")
    List<Utilisateur> getUtilisateursByLaboratoire(@PathVariable("laboratoire-id") Long laboratoireId);

}
