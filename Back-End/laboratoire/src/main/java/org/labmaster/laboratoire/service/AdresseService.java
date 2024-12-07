package org.labmaster.laboratoire.service;

import lombok.RequiredArgsConstructor;
import org.labmaster.laboratoire.dto.adresse.AdresseDTO;
import org.labmaster.laboratoire.model.Adresse;
import org.labmaster.laboratoire.repository.AdresseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdresseService {

    private final AdresseRepository adresseRepository;

    public List<AdresseDTO> getAllAdresses() {
        return adresseRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public Optional<AdresseDTO> getAdresseById(Long id) {
        return adresseRepository.findById(id)
                .map(this::toDTO);
    }

    public AdresseDTO createAdresse(AdresseDTO adresseDTO) {
        Adresse adresse = toEntity(adresseDTO);
        Adresse savedAdresse = adresseRepository.save(adresse);
        return toDTO(savedAdresse);
    }

    public AdresseDTO updateAdresse(Long id, AdresseDTO adresseDetails) {
        Adresse adresse = adresseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Adresse not found with id " + id));

        adresse.setNumVoie(adresseDetails.getNumVoie());
        adresse.setNomVoie(adresseDetails.getNomVoie());
        adresse.setCodePostal(adresseDetails.getCodePostal());
        adresse.setVille(adresseDetails.getVille());
        adresse.setCommune(adresseDetails.getCommune());

        Adresse updatedAdresse = adresseRepository.save(adresse);
        return toDTO(updatedAdresse);
    }

    public boolean deleteAdresse(Long id) {
        if (!adresseRepository.existsById(id)) {
            return false;
        }
        adresseRepository.deleteById(id);
        return true;
    }

    private AdresseDTO toDTO(Adresse adresse) {
        AdresseDTO dto = new AdresseDTO();
        dto.setId(adresse.getId());
        dto.setNumVoie(adresse.getNumVoie());
        dto.setNomVoie(adresse.getNomVoie());
        dto.setCodePostal(adresse.getCodePostal());
        dto.setVille(adresse.getVille());
        dto.setCommune(adresse.getCommune());
        return dto;
    }

    private Adresse toEntity(AdresseDTO dto) {
        Adresse adresse = new Adresse();
        adresse.setId(dto.getId());
        adresse.setNumVoie(dto.getNumVoie());
        adresse.setNomVoie(dto.getNomVoie());
        adresse.setCodePostal(dto.getCodePostal());
        adresse.setVille(dto.getVille());
        adresse.setCommune(dto.getCommune());
        return adresse;
    }
}
