package patient.patient.model.dossier;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import patient.patient.model.examin.Examin;
import patient.patient.model.patient.Patient;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Dossier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numDossier;

    @OneToMany(mappedBy = "dossier", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Examin> examins;

    @ManyToOne
    @JoinColumn(name = "fkIdPatient", nullable = false)
    private Patient patient;

    private String fkEmailUtilisateur;

    private LocalDate date;
}
