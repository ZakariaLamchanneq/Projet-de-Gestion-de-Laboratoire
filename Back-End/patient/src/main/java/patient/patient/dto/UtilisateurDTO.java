package patient.patient.dto;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UtilisateurDTO {

    private Long id;
    private String email;
    private String nomComplet;
    private String profession;
    private String numTel;
    private String signature;
    private String role;
    private Long laboratoireId;
    private String password;

}