package patient.patient.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import patient.patient.model.patient.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
