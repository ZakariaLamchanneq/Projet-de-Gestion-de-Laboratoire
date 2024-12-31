package patient.patient.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import patient.patient.model.examin.Examin;

import java.util.List;

@Repository
public interface ExaminRepository extends JpaRepository<Examin, Long> {
    List<Examin> findByDossierId(Long dossierId);
}
