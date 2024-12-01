package org.labmaster.laboratoire.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Adresse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int numVoie;
    private String nomVoie;
    private int codePostal;
    private String ville;
    private String commune;

    @OneToOne(mappedBy = "adresse")
    private ContactLaboratoire contactLaboratoire;

    public Adresse() {
    }

    public Adresse(Long id, int numVoie, String nomVoie, int codePostal, String ville, String commune) {
        this.id = id;
        this.numVoie = numVoie;
        this.nomVoie = nomVoie;
        this.codePostal = codePostal;
        this.ville = ville;
        this.commune = commune;
    }

    public Adresse(Long id, int numVoie, String nomVoie, int codePostal, String ville, String commune, ContactLaboratoire contactLaboratoire) {
        this.id = id;
        this.numVoie = numVoie;
        this.nomVoie = nomVoie;
        this.codePostal = codePostal;
        this.ville = ville;
        this.commune = commune;
        this.contactLaboratoire = contactLaboratoire;
    }

    @Override
    public String toString() {
        return "Adresse{" +
                "id=" + id +
                ", numVoie=" + numVoie +
                ", nomVoie='" + nomVoie + '\'' +
                ", codePostal=" + codePostal +
                ", ville='" + ville + '\'' +
                ", commune='" + commune + '\'' +
                ", contactLaboratoire=" + contactLaboratoire +
                '}';
    }
}
