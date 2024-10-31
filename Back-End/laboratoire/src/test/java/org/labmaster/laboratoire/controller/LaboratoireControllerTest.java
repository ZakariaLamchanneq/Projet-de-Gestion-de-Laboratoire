package org.labmaster.laboratoire.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.labmaster.laboratoire.model.FullLaboratoireResponse;
import org.labmaster.laboratoire.model.Laboratoire;
import org.labmaster.laboratoire.model.LaboratoireDTO;
import org.labmaster.laboratoire.service.LaboratoireService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class LaboratoireControllerTest {

    @Mock
    private LaboratoireService laboratoireService;

    @InjectMocks
    private LaboratoireController laboratoireController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateLaboratoire() throws IOException {
        LaboratoireDTO laboratoireDTO = new LaboratoireDTO();
        laboratoireDTO.setNom("Test Lab");
        laboratoireDTO.setNrc("12345");
        laboratoireDTO.setActive(true);
        laboratoireDTO.setDateActivation(LocalDate.parse("2023-01-01"));
        MultipartFile logoFile = mock(MultipartFile.class);
        when(logoFile.isEmpty()).thenReturn(false);
        when(logoFile.getBytes()).thenReturn(new byte[]{1, 2, 3});
        laboratoireDTO.setLogo(logoFile);

        Laboratoire laboratoire = new Laboratoire();
        laboratoire.setNom(laboratoireDTO.getNom());
        laboratoire.setNrc(laboratoireDTO.getNrc());
        laboratoire.setActive(laboratoireDTO.getActive());
        laboratoire.setDateActivation(laboratoireDTO.getDateActivation());
        laboratoire.setLogo(logoFile.getBytes());

        when(laboratoireService.createLaboratoire(any(Laboratoire.class))).thenReturn(laboratoire);

        ResponseEntity<?> response = laboratoireController.createLaboratoire(laboratoireDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(laboratoire, response.getBody());
    }

    @Test
    void testGetAllLaboratoires() {
        List<Laboratoire> laboratoires = Arrays.asList(new Laboratoire(), new Laboratoire());
        when(laboratoireService.getAllLaboratoires()).thenReturn(laboratoires);

        ResponseEntity<List<Laboratoire>> response = laboratoireController.getAllLaboratoires();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(laboratoires, response.getBody());
    }

    @Test
    void testGetLaboratoireById() {
        Laboratoire laboratoire = new Laboratoire();
        when(laboratoireService.getLaboratoireById(anyLong())).thenReturn(Optional.of(laboratoire));

        ResponseEntity<Laboratoire> response = laboratoireController.getLaboratoireById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(laboratoire, response.getBody());
    }

    @Test
    void testGetLaboratoireById_NotFound() {
        when(laboratoireService.getLaboratoireById(anyLong())).thenReturn(Optional.empty());

        ResponseEntity<Laboratoire> response = laboratoireController.getLaboratoireById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testUpdateLaboratoire() throws IOException {
        LaboratoireDTO laboratoireDTO = new LaboratoireDTO();
        laboratoireDTO.setNom("Updated Lab");
        laboratoireDTO.setNrc("54321");
        laboratoireDTO.setActive(true);
        laboratoireDTO.setDateActivation(LocalDate.parse("2023-01-01"));
        MultipartFile logoFile = mock(MultipartFile.class);
        when(logoFile.isEmpty()).thenReturn(false);
        when(logoFile.getBytes()).thenReturn(new byte[]{1, 2, 3});
        laboratoireDTO.setLogo(logoFile);

        Laboratoire laboratoire = new Laboratoire();
        laboratoire.setNom(laboratoireDTO.getNom());
        laboratoire.setNrc(laboratoireDTO.getNrc());
        laboratoire.setActive(laboratoireDTO.getActive());
        laboratoire.setDateActivation(laboratoireDTO.getDateActivation());
        laboratoire.setLogo(logoFile.getBytes());

        when(laboratoireService.updateLaboratoire(anyLong(), any(Laboratoire.class))).thenReturn(laboratoire);

        ResponseEntity<Laboratoire> response = laboratoireController.updateLaboratoire(1L, laboratoireDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(laboratoire, response.getBody());
    }

    @Test
    void testDeleteLaboratoire() {
        doNothing().when(laboratoireService).deleteLaboratoire(anyLong());

        ResponseEntity<Void> response = laboratoireController.deleteLaboratoire(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void testGetAllLaboratoiresWithUsers() {
        FullLaboratoireResponse fullLaboratoireResponse = new FullLaboratoireResponse();
        when(laboratoireService.getLaboratoiresWithUsers(anyLong())).thenReturn(fullLaboratoireResponse);

        ResponseEntity<FullLaboratoireResponse> response = laboratoireController.getAllLaboratoires(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(fullLaboratoireResponse, response.getBody());
    }
}