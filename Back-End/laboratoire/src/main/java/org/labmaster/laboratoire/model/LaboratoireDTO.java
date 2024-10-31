package org.labmaster.laboratoire.model;

import jakarta.persistence.Column;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public class LaboratoireDTO {
    @Column(nullable = false)
    private String nom;
    private String nrc;
    private Boolean active;
    private LocalDate dateActivation;
    private MultipartFile logo;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
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

    public MultipartFile getLogo() {
        return logo;
    }

    public void setLogo(MultipartFile logo) {
        this.logo = logo;
    }

    @Override
    public String toString() {
        return "LaboratoireDTO{" +
                "nom='" + nom + '\'' +
                ", nrc='" + nrc + '\'' +
                ", active=" + active +
                ", dateActivation=" + dateActivation +
                ", logo=" + logo +
                '}';
    }

}
