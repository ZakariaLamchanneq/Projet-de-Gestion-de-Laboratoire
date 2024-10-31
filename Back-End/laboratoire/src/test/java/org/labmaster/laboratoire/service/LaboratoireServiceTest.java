package org.labmaster.laboratoire.service;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.labmaster.laboratoire.client.UtilisateurClient;
import org.labmaster.laboratoire.model.FullLaboratoireResponse;
import org.labmaster.laboratoire.model.Laboratoire;
import org.labmaster.laboratoire.repository.LaboratoireRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LaboratoireServiceTest {

    @Mock
    private LaboratoireRepository laboratoireRepository;

    @Mock
    private UtilisateurClient utilisateurClient;

    @InjectMocks
    private LaboratoireService laboratoireService;

    private Laboratoire laboratoire;

    @BeforeEach
    void setUp() {
        laboratoire = new Laboratoire();
        laboratoire.setId(1L);
        laboratoire.setNom("Test Lab");
        laboratoire.setNrc("12345");
        laboratoire.setActive(true);
    }

    @Test
    void testCreateLaboratoire() {
        when(laboratoireRepository.save(any(Laboratoire.class))).thenReturn(laboratoire);

        Laboratoire createdLaboratoire = laboratoireService.createLaboratoire(laboratoire);

        assertNotNull(createdLaboratoire);
        assertEquals(laboratoire.getNom(), createdLaboratoire.getNom());
        verify(laboratoireRepository, times(1)).save(laboratoire);
    }

    @Test
    void testGetAllLaboratoires() {
        when(laboratoireRepository.findAll()).thenReturn(Collections.singletonList(laboratoire));

        var laboratoires = laboratoireService.getAllLaboratoires();

        assertFalse(laboratoires.isEmpty());
        assertEquals(1, laboratoires.size());
        verify(laboratoireRepository, times(1)).findAll();
    }

    @Test
    void testGetLaboratoireById() {
        when(laboratoireRepository.findById(1L)).thenReturn(Optional.of(laboratoire));

        var foundLaboratoire = laboratoireService.getLaboratoireById(1L);

        assertTrue(foundLaboratoire.isPresent());
        assertEquals(laboratoire.getNom(), foundLaboratoire.get().getNom());
        verify(laboratoireRepository, times(1)).findById(1L);
    }

    @Test
    void testUpdateLaboratoire() {
        when(laboratoireRepository.findById(1L)).thenReturn(Optional.of(laboratoire));
        when(laboratoireRepository.save(any(Laboratoire.class))).thenReturn(laboratoire);

        Laboratoire updatedDetails = new Laboratoire();
        updatedDetails.setNom("Updated Lab");
        updatedDetails.setNrc("67890");
        updatedDetails.setActive(false);

        Laboratoire updatedLaboratoire = laboratoireService.updateLaboratoire(1L, updatedDetails);

        assertNotNull(updatedLaboratoire);
        assertEquals(updatedDetails.getNom(), updatedLaboratoire.getNom());
        verify(laboratoireRepository, times(1)).findById(1L);
        verify(laboratoireRepository, times(1)).save(laboratoire);
    }

    @Test
    void testDeleteLaboratoire() {
        when(laboratoireRepository.existsById(1L)).thenReturn(true);

        laboratoireService.deleteLaboratoire(1L);

        verify(laboratoireRepository, times(1)).existsById(1L);
        verify(laboratoireRepository, times(1)).deleteById(1L);
    }

    @Test
    void testGetLaboratoiresWithUsers() {
        when(laboratoireRepository.findById(1L)).thenReturn(Optional.of(laboratoire));
        when(utilisateurClient.getUtilisateursByLaboratoire(1L)).thenReturn(Collections.emptyList());

        FullLaboratoireResponse response = laboratoireService.getLaboratoiresWithUsers(1L);

        assertNotNull(response);
        assertEquals(laboratoire.getNom(), response.getNom());
        verify(laboratoireRepository, times(1)).findById(1L);
        verify(utilisateurClient, times(1)).getUtilisateursByLaboratoire(1L);
    }
}