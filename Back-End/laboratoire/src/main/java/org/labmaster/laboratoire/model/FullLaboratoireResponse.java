package org.labmaster.laboratoire.model;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FullLaboratoireResponse {

    private String nom;

    private String logo;
    private String nrc;
    private Boolean active;
    private LocalDate dateActivation;

    List<Utilisateur> utilisateurs;
}
