package org.labmaster.laboratoire.dto.contactLaboratoire;

import lombok.Data;

@Data
public class ContactLaboratoireDTO {
    private Long id;
    private int numTel;
    private int fax;
    private String email;
    private Long fkIdLaboratoire;
    private Long fkIdAdresse;

}
