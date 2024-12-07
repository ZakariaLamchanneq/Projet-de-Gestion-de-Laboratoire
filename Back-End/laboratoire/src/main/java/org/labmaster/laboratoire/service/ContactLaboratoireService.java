package org.labmaster.laboratoire.service;

import lombok.RequiredArgsConstructor;
import org.labmaster.laboratoire.dto.contactLaboratoire.ContactLaboratoireDTO;
import org.labmaster.laboratoire.model.Adresse;
import org.labmaster.laboratoire.model.ContactLaboratoire;
import org.labmaster.laboratoire.model.Laboratoire;
import org.labmaster.laboratoire.repository.AdresseRepository;
import org.labmaster.laboratoire.repository.ContactLaboratoireRepository;
import org.labmaster.laboratoire.repository.LaboratoireRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContactLaboratoireService {

    private final ContactLaboratoireRepository contactLaboratoireRepository;
    private final LaboratoireRepository laboratoireRepository;
    private final AdresseRepository adresseRepository;

    public List<ContactLaboratoireDTO> getAllContactsLaboratoire() {
        return contactLaboratoireRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public Optional<ContactLaboratoireDTO> getContactLaboratoireById(Long id) {
        return contactLaboratoireRepository.findById(id)
                .map(this::toDTO);
    }

    public ContactLaboratoireDTO createContactLaboratoire(ContactLaboratoireDTO contactLaboratoireDTO) {
        ContactLaboratoire contactLaboratoire = toEntity(contactLaboratoireDTO);
        ContactLaboratoire savedContact = contactLaboratoireRepository.save(contactLaboratoire);
        return toDTO(savedContact);
    }

    public ContactLaboratoireDTO updateContactLaboratoire(Long id, ContactLaboratoireDTO contactLaboratoireDTO) {
        ContactLaboratoire contactLaboratoire = contactLaboratoireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ContactLaboratoire not found with id " + id));

        contactLaboratoire.setNumTel(contactLaboratoireDTO.getNumTel());
        contactLaboratoire.setFax(contactLaboratoireDTO.getFax());
        contactLaboratoire.setEmail(contactLaboratoireDTO.getEmail());

        // Assume `fkIdLaboratoire` and `fkIdAdresse` are used to fetch related entities
        // This requires additional repositories or services to fetch Laboratoire and Adresse
        // For now, these methods are placeholders:
        contactLaboratoire.setLaboratoire(fetchLaboratoireById(contactLaboratoireDTO.getFkIdLaboratoire()));
        contactLaboratoire.setAdresse(fetchAdresseById(contactLaboratoireDTO.getFkIdAdresse()));

        ContactLaboratoire updatedContact = contactLaboratoireRepository.save(contactLaboratoire);
        return toDTO(updatedContact);
    }

    public boolean deleteContactLaboratoire(Long id) {
        if (!contactLaboratoireRepository.existsById(id)) {
            return false;
        }
        contactLaboratoireRepository.deleteById(id);
        return true;
    }

    // Convert entity to DTO
    private ContactLaboratoireDTO toDTO(ContactLaboratoire contactLaboratoire) {
        ContactLaboratoireDTO dto = new ContactLaboratoireDTO();
        dto.setId(contactLaboratoire.getId());
        dto.setNumTel(contactLaboratoire.getNumTel());
        dto.setFax(contactLaboratoire.getFax());
        dto.setEmail(contactLaboratoire.getEmail());

        if (contactLaboratoire.getLaboratoire() != null) {
            dto.setFkIdLaboratoire(contactLaboratoire.getLaboratoire().getId());
        }

        if (contactLaboratoire.getAdresse() != null) {
            dto.setFkIdAdresse(contactLaboratoire.getAdresse().getId());
        }

        return dto;
    }

    // Convert DTO to entity
    private ContactLaboratoire toEntity(ContactLaboratoireDTO dto) {
        ContactLaboratoire contactLaboratoire = new ContactLaboratoire();
        contactLaboratoire.setId(dto.getId());
        contactLaboratoire.setNumTel(dto.getNumTel());
        contactLaboratoire.setFax(dto.getFax());
        contactLaboratoire.setEmail(dto.getEmail());

        // Set related entities if their IDs are provided
        if (dto.getFkIdLaboratoire() != null) {
            contactLaboratoire.setLaboratoire(fetchLaboratoireById(dto.getFkIdLaboratoire()));
        }

        if (dto.getFkIdAdresse() != null) {
            contactLaboratoire.setAdresse(fetchAdresseById(dto.getFkIdAdresse()));
        }

        return contactLaboratoire;
    }

    // Placeholder methods to fetch related entities
    private Laboratoire fetchLaboratoireById(Long id) {
        return laboratoireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Laboratoire not found with id " + id));
    }


    private Adresse fetchAdresseById(Long id) {
        return adresseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Adresse not found with id " + id));
    }

}
