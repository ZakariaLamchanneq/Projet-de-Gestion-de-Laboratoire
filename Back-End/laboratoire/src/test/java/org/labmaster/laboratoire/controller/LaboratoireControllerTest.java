package org.labmaster.laboratoire.controller;

import jakarta.ws.rs.core.MediaType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.labmaster.laboratoire.model.Laboratoire;
import org.labmaster.laboratoire.service.LaboratoireService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@WebMvcTest(LaboratoireController.class)
class LaboratoireControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private LaboratoireService laboratoireService;

    @InjectMocks
    private LaboratoireController laboratoireController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createLaboratoire() throws Exception {
        // Given: Create a new Laboratoire object
        Laboratoire laboratoire = new Laboratoire();
        laboratoire.setNom("Test Lab");  // Set necessary fields

        // When: The service creates the laboratoire
        when(laboratoireService.createLaboratoire(any(Laboratoire.class))).thenReturn(laboratoire);

        // Then: Perform the POST request and verify the status
        mockMvc.perform(post("/api/laboratoires/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Test Lab\"}")) // JSON representation of the Laboratoire
                .andExpect(status().isCreated()); // Expect 201 Created
    }
}