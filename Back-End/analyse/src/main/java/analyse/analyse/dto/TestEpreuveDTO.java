package analyse.analyse.dto;

import lombok.Data;

@Data
public class TestEpreuveDTO {

    private Long id;

    private String nomEpreuve;
    private Long intervalMinDeReference;
    private Long intervalMaxDeReference;
    private String uniteDeReference;
    private String Details;

}
