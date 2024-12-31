package analyse.analyse.repository;

import analyse.analyse.model.Analyse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Observable;

public interface AnalyseRepository extends JpaRepository<Analyse,Long> {

    List<Analyse> findByFkIdLaboratoire(Long laboratoireId);
}
