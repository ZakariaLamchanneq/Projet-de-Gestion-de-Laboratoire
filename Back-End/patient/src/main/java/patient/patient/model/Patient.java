package patient.patient.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    private String nomComplet;
    private Date dateNaissance;
    private String lieuNaissance;
    private String sexe;
    private String typePieceIdentite;
    private Long numPieceIdentite;
    private String adresse;
    private Long numTel;
    private String email;
    private Boolean isArchived;
    private String visiblePour;

    public Patient() {
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", nomCompletL='" + nomComplet + '\'' +
                ", dateNaissance=" + dateNaissance +
                ", lieuNaissance='" + lieuNaissance + '\'' +
                ", sexe='" + sexe + '\'' +
                ", typePieceIdentite='" + typePieceIdentite + '\'' +
                ", numPieceIdentite=" + numPieceIdentite +
                ", adresse='" + adresse + '\'' +
                ", numTel=" + numTel +
                ", email='" + email + '\'' +
                ", visiblePour='" + visiblePour + '\'' +
                '}';
    }
}
