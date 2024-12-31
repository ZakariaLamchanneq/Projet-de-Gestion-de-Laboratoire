package patient.patient.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import patient.patient.model.dossier.Dossier;

@Repository
public interface DossierRepository extends JpaRepository<Dossier, Long> {
}
