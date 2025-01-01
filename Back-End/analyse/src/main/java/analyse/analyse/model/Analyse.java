package analyse.analyse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Analyse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String nom;
    private String description;
    private Long fkIdLaboratoire ;

    @OneToMany(mappedBy = "analyse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Epreuve> epreuves;

}
