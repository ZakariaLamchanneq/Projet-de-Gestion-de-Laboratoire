package patient.patient.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PatientDTO {
    private Long id;
    private String nomComplet;
    private Date dateNaissance;
    private String lieuDeNaissance;
    private String sexe;
    private String typePieceIdentite;
    private Long numPieceIdentite;
    private String adresse;
    private Long numTel;
    private String email;
    private String visiblePour;
}
