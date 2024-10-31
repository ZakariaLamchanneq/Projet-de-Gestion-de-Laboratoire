package org.labmaster.laboratoire.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.util.Arrays;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getNrc() {
        return nrc;
    }

    public void setNrc(String nrc) {
        this.nrc = nrc;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDate getDateActivation() {
        return dateActivation;
    }

    public void setDateActivation(LocalDate dateActivation) {
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
