package org.labmaster.laboratoire.repository;

import org.labmaster.laboratoire.model.ContactLaboratoire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactLaboratoireRepository extends JpaRepository<ContactLaboratoire, Long> {
    List<ContactLaboratoire> findByLaboratoireId(Long laboratoireId);
}
