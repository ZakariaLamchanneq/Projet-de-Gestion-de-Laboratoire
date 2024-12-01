package org.labmaster.laboratoire.dto.laboratoire;

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

    @Override
    public String toString() {
        return "Utilisateur{" +
                "nomComplet='" + nomComplet + '\'' +
                ", profession='" + profession + '\'' +
                ", numTel='" + numTel + '\'' +
                ", signature='" + signature + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
