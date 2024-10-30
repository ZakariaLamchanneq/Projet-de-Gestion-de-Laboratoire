package org.labmaster.utilisateur.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.labmaster.utilisateur.model.Utilisateur;
import org.labmaster.utilisateur.service.UtilisateurService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


class UtilisateurControllerTest {

    @Mock
    private UtilisateurService utilisateurService;

    @InjectMocks
    private UtilisateurController utilisateurController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUtilisateur() {
        Utilisateur utilisateur = new Utilisateur();
        when(utilisateurService.createUtilisateur(any(Utilisateur.class))).thenReturn(utilisateur);

        ResponseEntity<?> response = utilisateurController.createUtilisateur(utilisateur);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        verify(utilisateurService, times(1)).createUtilisateur(any(Utilisateur.class));
    }

    @Test
    void testDeleteUtilisateur() {
        Long id = 1L;

        ResponseEntity<Void> response = utilisateurController.deleteUtilisateur(id);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(utilisateurService, times(1)).deleteUtilisateurById(id);
    }

    @Test
    void testDeleteUtilisateur_NotFound() {
        Long id = 1L;
        doThrow(new RuntimeException("Not found")).when(utilisateurService).deleteUtilisateurById(id);

        ResponseEntity<Void> response = utilisateurController.deleteUtilisateur(id);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(utilisateurService, times(1)).deleteUtilisateurById(id);
    }


    @Test
    void testGetUtilisateur() {
        Long id = 1L;
        Utilisateur utilisateur = new Utilisateur();
        when(utilisateurService.getUtilisateurById(id)).thenReturn(Optional.of(utilisateur));

        ResponseEntity<Optional<Utilisateur>> response = utilisateurController.getUtilisateur(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(Optional.of(utilisateur), response.getBody());
        verify(utilisateurService, times(1)).getUtilisateurById(id);
    }

    @Test
    void testGetAllUtilisateurs() {
        List<Utilisateur> utilisateurs = Arrays.asList(new Utilisateur(), new Utilisateur());
        when(utilisateurService.getAllUtilisateurs()).thenReturn(utilisateurs);

        ResponseEntity<List<Utilisateur>> response = utilisateurController.getAllUtilisateurs();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(utilisateurs, response.getBody());
        verify(utilisateurService, times(1)).getAllUtilisateurs();
    }



    @Test
    void testUpdateUtilisateur() {
        Long utilisateurId = 1L;
        Utilisateur updatedUser = new Utilisateur();
        when(utilisateurService.updateUtilisateur(utilisateurId, updatedUser)).thenReturn(updatedUser);

        ResponseEntity<Utilisateur> response = utilisateurController.updateUtilisateur(utilisateurId, updatedUser);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedUser, response.getBody());
        verify(utilisateurService, times(1)).updateUtilisateur(utilisateurId, updatedUser);
    }

    @Test
    void testUpdateUtilisateur_NotFound() {
        Long utilisateurId = 1L;
        Utilisateur updatedUser = new Utilisateur();
        when(utilisateurService.updateUtilisateur(utilisateurId, updatedUser)).thenThrow(new RuntimeException("Not found"));

        ResponseEntity<Utilisateur> response = utilisateurController.updateUtilisateur(utilisateurId, updatedUser);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(utilisateurService, times(1)).updateUtilisateur(utilisateurId, updatedUser);
    }


}