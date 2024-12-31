package patient.patient.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import patient.patient.model.examin.Examin;

@Repository
public interface ExaminRepository extends JpaRepository<Examin, Long> {
}
