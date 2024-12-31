package analyse.analyse.dto;

import lombok.Data;

@Data
public class AnalyseDTO {
    private Long Id;

    private String nom;
    private String description;
    private Long fkIdLaboratoire ;
}
