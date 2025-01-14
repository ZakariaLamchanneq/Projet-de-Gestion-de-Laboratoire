package analyse.analyse.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class TestEpreuve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomEpreuve;
    private Long intervalMinDeReference;
    private Long intervalMaxDeReference;
    private String uniteDeReference;
    private String details;

    @OneToOne(mappedBy = "testEpreuve")
    private Epreuve epreuve;
}
