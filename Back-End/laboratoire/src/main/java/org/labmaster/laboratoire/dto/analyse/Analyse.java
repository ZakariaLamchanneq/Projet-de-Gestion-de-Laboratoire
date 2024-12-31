package org.labmaster.laboratoire.dto.analyse;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Analyse {

    private Long Id;

    private String nom;
    private String desciption;
    private Long fkIdLaboratoire ;


}
