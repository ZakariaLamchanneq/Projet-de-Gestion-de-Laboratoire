package org.labmaster.laboratoire.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Utilisateur {

    private String nomComplet;
    private String profession;
    private String numTel;
    private String signature;
    private String role;
}
