package patient.patient.dto;

import lombok.Data;

@Data
public class ExaminDTO {
    private Long id;

    private Long fkNumDossier;
    private Long fkIdEpreuve;

//    private Long fkIdTestEpreuve;

    private String resultat;

}
