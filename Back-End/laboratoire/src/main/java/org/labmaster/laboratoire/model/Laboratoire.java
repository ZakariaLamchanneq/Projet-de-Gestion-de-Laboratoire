package org.labmaster.laboratoire.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.util.Arrays;

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

    @Override
    public String toString() {
        return "Laboratoire{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", logo=" + Arrays.toString(logo) +
                ", nrc='" + nrc + '\'' +
                ", active=" + active +
                ", dateActivation=" + dateActivation +
                '}';
    }
}
