package patient.patient.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import patient.patient.dto.UtilisateurDTO;

import java.util.List;

@FeignClient(name = "utilisateur-microservice", url = "${application.config.utilisateurs-url}")
public interface UtilisateurClient {


    @GetMapping("/utilisateurs")
    List<UtilisateurDTO> getAllUtilisateurs();
}