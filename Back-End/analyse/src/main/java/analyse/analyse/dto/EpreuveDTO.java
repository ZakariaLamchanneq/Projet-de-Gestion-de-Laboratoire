package analyse.analyse.dto;

import lombok.Data;

@Data
public class EpreuveDTO {
    private Long id;

    private String nom ;
    private Long fkIdTestEpreuve;
    private Long fkIdAnalyse;



}
