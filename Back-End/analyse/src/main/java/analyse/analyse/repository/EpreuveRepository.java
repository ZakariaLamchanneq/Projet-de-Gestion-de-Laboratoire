package analyse.analyse.repository;

import analyse.analyse.model.Epreuve;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EpreuveRepository extends JpaRepository<Epreuve,Long> {
    List<Epreuve> findByAnalyseId(Long analyseId);
}
