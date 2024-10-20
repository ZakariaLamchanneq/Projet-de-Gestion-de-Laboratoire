package com.gestionlabo.service;

import com.gestionlabo.model.Laboratoire;
import com.gestionlabo.repository.LaboratoireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LaboratoireService {
    private final LaboratoireRepository laboratoireRepository;

    @Autowired
    public LaboratoireService(LaboratoireRepository laboratoireRepository) {
        this.laboratoireRepository = laboratoireRepository;
    }

    public Laboratoire createLaboratoire(Laboratoire laboratoire) {
        return laboratoireRepository.save(laboratoire);
    }

    public List<Laboratoire> getAllLaboratoires() {
        return laboratoireRepository.findAll();
    }


}
