package org.labmaster.laboratoire.service;

import lombok.RequiredArgsConstructor;
import org.labmaster.laboratoire.client.UtilisateurClient;
import org.labmaster.laboratoire.dto.laboratoire.LaboratoireDTO;
import org.labmaster.laboratoire.dto.laboratoire.FullLaboratoireResponse;
import org.labmaster.laboratoire.exception.ResourceNotFoundException;
import org.labmaster.laboratoire.model.Laboratoire;
import org.labmaster.laboratoire.repository.LaboratoireRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class LaboratoireService {

    private final LaboratoireRepository laboratoireRepository;
    private final UtilisateurClient utilisateurClient;

    // Create
    public LaboratoireDTO createLaboratoire(LaboratoireDTO laboratoireDTO){
        Laboratoire laboratoire = toEntity(laboratoireDTO);
        Laboratoire savedLaboratoire = laboratoireRepository.save(laboratoire);
        return toDTO(savedLaboratoire);
    }

    // Fetch all
    public List<LaboratoireDTO> getAllLaboratoires() {
        return laboratoireRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // Search by Id
    public Optional<LaboratoireDTO> getLaboratoireById(Long id) {
        return laboratoireRepository.findById(id)
                .map(this::toDTO);
    }

    // Update method needs modification
    public LaboratoireDTO updateLaboratoire(Long id, LaboratoireDTO laboratoireDTO) {
        Laboratoire laboratoire = laboratoireRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Laboratoire not found with id " + id));

        laboratoire.setNom(laboratoireDTO.getNom());
        laboratoire.setNrc(laboratoireDTO.getNrc());
        laboratoire.setActive(laboratoireDTO.getActive());
        laboratoire.setDateActivation(laboratoireDTO.getDateActivation());

        // Update the logo if it's provided
        if (laboratoireDTO.getLogo() != null && !laboratoireDTO.getLogo().isEmpty()) {
            String base64Image = laboratoireDTO.getLogo();

            // Remove the data URL prefix if it exists
            if (base64Image.startsWith("data:image/png;base64,")) {
                base64Image = base64Image.substring("data:image/png;base64,".length());
            }

            // Decode the Base64 string to byte array
            byte[] logoBytes = Base64.getDecoder().decode(base64Image);
            laboratoire.setLogo(logoBytes);
        }

        Laboratoire updatedLaboratoire = laboratoireRepository.save(laboratoire);
        return toDTO(updatedLaboratoire);
    }

    // Delete
    public boolean deleteLaboratoire(Long id) {
        if (!laboratoireRepository.existsById(id)) {
            return false;
        }
        laboratoireRepository.deleteById(id);
        return true;  // Return true if deletion was successful
    }

    // Find Laboratoire and its users by Id
    public FullLaboratoireResponse getLaboratoiresWithUsers(Long laboratoireId) {
        var laboratoire = laboratoireRepository.findById(laboratoireId).orElse(
                new Laboratoire("NOT_FOUND")
        );
        var utilisateurs = utilisateurClient.getUtilisateursByLaboratoire(laboratoireId);

        return FullLaboratoireResponse.builder()
                .nom(laboratoire.getNom())
                .nrc(laboratoire.getNrc())
                .logo(laboratoire.getLogo())  // Return the raw bytes
                .active(laboratoire.getActive())
                .dateActivation(laboratoire.getDateActivation())
                .utilisateurs(utilisateurs)
                .build();
    }

    // Convert entity to DTO with Base64 logo conversion
    private LaboratoireDTO toDTO(Laboratoire laboratoire) {
        LaboratoireDTO dto = new LaboratoireDTO();
        dto.setId(laboratoire.getId());
        dto.setNom(laboratoire.getNom());
        dto.setNrc(laboratoire.getNrc());
        dto.setActive(laboratoire.getActive());
        dto.setDateActivation(laboratoire.getDateActivation());

        // Convert byte[] logo to Base64 string for DTO (only for response)
        if (laboratoire.getLogo() != null && laboratoire.getLogo().length > 0) {
            String base64Logo = "data:image/png;base64," +
                    Base64.getEncoder().encodeToString(laboratoire.getLogo());
            dto.setLogo(base64Logo);  // Set the full Base64 data URL
        }

        return dto;
    }

    // Convert DTO to entity
    private Laboratoire toEntity(LaboratoireDTO dto) {
        Laboratoire laboratoire = new Laboratoire();
        laboratoire.setId(dto.getId());
        laboratoire.setNom(dto.getNom());
        laboratoire.setNrc(dto.getNrc());
        laboratoire.setActive(dto.getActive());
        laboratoire.setDateActivation(dto.getDateActivation());

        // If the logo is a full Base64 data URL, extract the Base64 part
        if (dto.getLogo() != null && !dto.getLogo().isEmpty()) {
            String base64Image = dto.getLogo();

            // Remove the data URL prefix if it exists
            if (base64Image.startsWith("data:image/png;base64,")) {
                base64Image = base64Image.substring("data:image/png;base64,".length());
            }

            // Decode the Base64 string to byte array
            byte[] logoBytes = Base64.getDecoder().decode(base64Image);
            laboratoire.setLogo(logoBytes);
        }

        return laboratoire;
    }
}
