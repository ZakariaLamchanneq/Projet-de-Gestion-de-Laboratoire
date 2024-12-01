package org.labmaster.laboratoire.dto.adresse;

import lombok.Data;

@Data
public class AdresseDTO {
    private Long id;
    private int numVoie;
    private String nomVoie;
    private int codePostal;
    private String ville;
    private String commune;

}
