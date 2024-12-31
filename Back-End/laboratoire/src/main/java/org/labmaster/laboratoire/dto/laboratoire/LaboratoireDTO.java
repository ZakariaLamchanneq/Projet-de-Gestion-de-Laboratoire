package org.labmaster.laboratoire.dto.laboratoire;

import jakarta.persistence.Column;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
public class LaboratoireDTO {
    private Long id;
    private String nom;
    private String nrc;
    private Boolean active;
    private LocalDate dateActivation;
    private String logo;
}
