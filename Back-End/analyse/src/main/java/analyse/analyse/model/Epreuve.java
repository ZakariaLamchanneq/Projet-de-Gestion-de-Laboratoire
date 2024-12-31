package analyse.analyse.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Epreuve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom ;

    @ManyToOne
    @JoinColumn(name = "fkIdAnalyse", nullable = false)
    private Analyse analyse;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fkIdTestEpreuve", referencedColumnName = "id")
    private TestEpreuve testEpreuve;
}
