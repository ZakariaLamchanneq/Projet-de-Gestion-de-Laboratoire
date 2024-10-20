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

//    @ManyToOne
//    @JoinColumn(name = "laboratoire_id")
//    private Laboratoire laboratoire;

    public Utilisateur() {
    }

    public Utilisateur(String email, String nomComplet, String profession, String numTel, String signature, String role, Long laboratoireId) {
        this.email = email;
        this.nomComplet = nomComplet;
        this.profession = profession;
        this.numTel = numTel;
        this.signature = signature;
        this.role = role;
        this.laboratoireId = laboratoireId;
    }
}