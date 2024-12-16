package org.labmaster.gateway;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "utilisateur-microservice", url = "http://localhost:8222/api/utilisateurs")
public interface UtilisateurClient {

    @PostMapping("/verify")
    ResponseEntity<UserResponse> verifyUser(@RequestBody LoginRequest request);

}
