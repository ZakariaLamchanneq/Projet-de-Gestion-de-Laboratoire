package org.labmaster.laboratoire.dto.analyse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyseDTO {
    private Long Id;

    private String nom;
    private String desciption;
    private Long fkIdLaboratoire ;
}
