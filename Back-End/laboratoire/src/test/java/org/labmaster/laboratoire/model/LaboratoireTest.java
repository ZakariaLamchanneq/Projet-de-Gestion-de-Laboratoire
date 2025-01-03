package org.labmaster.laboratoire.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

class LaboratoireTest {

    @Test
    void testDefaultConstructor() {
        Laboratoire laboratoire = new Laboratoire();
        assertEquals("null", laboratoire.getNom());
    }

    @Test
    void testConstructorWithName() {
        Laboratoire laboratoire = new Laboratoire("Test Lab");
        assertEquals("Test Lab", laboratoire.getNom());
    }

    @Test
    void testFullConstructor() {
        byte[] logo = {1, 2, 3};
        LocalDate date = LocalDate.now();
        Laboratoire laboratoire = new Laboratoire("Test Lab", logo, "12345", true, date);

        assertEquals("Test Lab", laboratoire.getNom());
        assertArrayEquals(logo, laboratoire.getLogo());
        assertEquals("12345", laboratoire.getNrc());
        assertTrue(laboratoire.getActive());
        assertEquals(date, laboratoire.getDateActivation());
    }

    @Test
    void testSettersAndGetters() {
        Laboratoire laboratoire = new Laboratoire();
        laboratoire.setId(1L);
        laboratoire.setNom("Test Lab");
        byte[] logo = {1, 2, 3};
        laboratoire.setLogo(logo);
        laboratoire.setNrc("12345");
        laboratoire.setActive(true);
        LocalDate date = LocalDate.now();
        laboratoire.setDateActivation(date);

        assertEquals(1L, laboratoire.getId());
        assertEquals("Test Lab", laboratoire.getNom());
        assertArrayEquals(logo, laboratoire.getLogo());
        assertEquals("12345", laboratoire.getNrc());
        assertTrue(laboratoire.getActive());
        assertEquals(date, laboratoire.getDateActivation());
    }

    @Test
    void testToString() {
        byte[] logo = {1, 2, 3};
        LocalDate date = LocalDate.now();
        Laboratoire laboratoire = new Laboratoire("Test Lab", logo, "12345", true, date);
        String expected = "Laboratoire{id=null, nom='Test Lab', logo=[1, 2, 3], nrc='12345', active=true, dateActivation=" + date + ", contacts=null}";
        assertEquals(expected, laboratoire.toString());
    }
}