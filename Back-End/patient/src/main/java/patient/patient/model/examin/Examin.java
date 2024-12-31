package patient.patient.model.examin;

import jakarta.persistence.*;
import lombok.*;
import patient.patient.model.dossier.Dossier;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Examin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fkIdDossier", nullable = false)
    private Dossier dossier;

    private Long fkIdEpreuve;

//    private Long fkIdTestEpreuve;

    private String resultat;

}
