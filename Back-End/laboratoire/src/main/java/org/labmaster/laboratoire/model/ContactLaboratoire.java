package org.labmaster.laboratoire.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class ContactLaboratoire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int numTel;
    private int fax;
    private String email;

    @ManyToOne
    @JoinColumn(name = "fkIdLaboratoire", nullable = false)
    private Laboratoire laboratoire;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fkIdAdresse", referencedColumnName = "id")
    private Adresse adresse;

    public ContactLaboratoire() {
    }

    public ContactLaboratoire(Long id, int numTel, int fax, String email) {
        this.id = id;
        this.numTel = numTel;
        this.fax = fax;
        this.email = email;
    }

    public ContactLaboratoire(Long id, int numTel, int fax, String email, Laboratoire laboratoire, Adresse adresse) {
        this.id = id;
        this.numTel = numTel;
        this.fax = fax;
        this.email = email;
        this.laboratoire = laboratoire;
        this.adresse = adresse;
    }

    @Override
    public String toString() {
        return "ContactLaboratoire{" +
                "id=" + id +
                ", numTel=" + numTel +
                ", fax=" + fax +
                ", email='" + email + '\'' +
                ", laboratoire=" + laboratoire +
                ", adresse=" + adresse +
                '}';
    }
}
