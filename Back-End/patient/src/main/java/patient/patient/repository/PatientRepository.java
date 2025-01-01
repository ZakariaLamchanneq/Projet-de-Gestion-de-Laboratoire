package patient.patient.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import patient.patient.model.patient.Patient;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByIsArchived(boolean isArchived);
}
