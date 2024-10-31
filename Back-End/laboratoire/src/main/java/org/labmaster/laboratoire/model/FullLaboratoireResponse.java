package org.labmaster.laboratoire.model;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
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

    @Lob
    @Column(name = "logo", columnDefinition = "BLOB")
    private byte[] logo; // Store image data as byte array

    private String nrc;
    private Boolean active;
    private LocalDate dateActivation;

    List<Utilisateur> utilisateurs;
}
