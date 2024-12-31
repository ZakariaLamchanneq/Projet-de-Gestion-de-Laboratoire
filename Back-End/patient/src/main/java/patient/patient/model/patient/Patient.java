package patient.patient.model.patient;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import patient.patient.model.dossier.Dossier;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    private String visiblePour;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Dossier> dossiers;

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
