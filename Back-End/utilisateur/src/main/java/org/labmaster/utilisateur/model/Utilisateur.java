package org.labmaster.utilisateur.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    private String nomComplet;
    private String profession;
    private String numTel;
    private String signature;
    private String role;
    private Long laboratoireId;
    private String password;



    public Utilisateur() {
    }

    @Override
    public String toString() {
        return "Utilisateur{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", nomComplet='" + nomComplet + '\'' +
                ", profession='" + profession + '\'' +
                ", numTel='" + numTel + '\'' +
                ", signature='" + signature + '\'' +
                ", role='" + role + '\'' +
                ", laboratoireId=" + laboratoireId +
                ", password='" + password + '\'' +
                '}';
    }
}