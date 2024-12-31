package patient.patient.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DossierDTO {
    private Long numDossier;
    private String fkEmailUtilisateur;
    private Long fkNumPatient;
    private LocalDate date;
}
