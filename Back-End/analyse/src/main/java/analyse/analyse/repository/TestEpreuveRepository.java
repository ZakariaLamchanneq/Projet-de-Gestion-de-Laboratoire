package analyse.analyse.repository;

import analyse.analyse.model.TestEpreuve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestEpreuveRepository extends JpaRepository<TestEpreuve,Long> {

}
