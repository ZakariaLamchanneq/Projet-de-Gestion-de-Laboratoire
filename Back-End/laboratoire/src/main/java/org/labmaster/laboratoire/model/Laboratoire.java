package org.labmaster.laboratoire.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Setter
@Getter
@Entity
public class Laboratoire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Lob
    @Column(name = "logo", columnDefinition = "LONGBLOB")
    private byte[] logo; // Store image data as byte array
    private String nrc;
    private Boolean active;
    private LocalDate dateActivation;

    @OneToMany(mappedBy = "laboratoire", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContactLaboratoire> contacts;


    public Laboratoire() {
        this.nom="null";
    }

    public Laboratoire(String nom) {
        this.nom = nom;
    }

    public Laboratoire(String nom, byte[] logo, String nrc, Boolean active, LocalDate dateActivation) {
        this.nom = nom;
        this.logo = logo;
        this.nrc = nrc;
        this.active = active;
        this.dateActivation = dateActivation;
    }

    public Laboratoire(Long id, String nom, byte[] logo, String nrc, Boolean active, LocalDate dateActivation, List<ContactLaboratoire> contacts) {
        this.id = id;
        this.nom = nom;
        this.logo = logo;
        this.nrc = nrc;
        this.active = active;
        this.dateActivation = dateActivation;
        this.contacts = contacts;
    }

    @Override
    public String toString() {
        return "Laboratoire{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", logo=" + Arrays.toString(logo) +
                ", nrc='" + nrc + '\'' +
                ", active=" + active +
                ", dateActivation=" + dateActivation +
                ", contacts=" + contacts +
                '}';
    }
}
