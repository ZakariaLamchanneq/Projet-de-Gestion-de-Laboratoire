package analyse.analyse.repository;

import analyse.analyse.model.Epreuve;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EpreuveRepository extends JpaRepository<Epreuve,Long> {

}
