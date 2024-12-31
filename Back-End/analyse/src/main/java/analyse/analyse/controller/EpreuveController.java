package analyse.analyse.controller;

import analyse.analyse.dto.EpreuveDTO;
import analyse.analyse.service.EpreuveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/epreuves")
public class EpreuveController {


    @Autowired
    private EpreuveService epreuveService;

    @PostMapping("/add")
    public ResponseEntity<EpreuveDTO> addEpreuve(@RequestBody EpreuveDTO epreuveDTO){
        EpreuveDTO epreuveCreated = epreuveService.createEpreuve(epreuveDTO);
        return new ResponseEntity<>(epreuveCreated, HttpStatus.OK);
    }


    @GetMapping("/all")
    public ResponseEntity<List<EpreuveDTO>> getAllEpreuves(){
        List<EpreuveDTO> epreuveDTOList = epreuveService.getAllEpreuves();
        return new ResponseEntity<>(epreuveDTOList,HttpStatus.OK);
    }

    @GetMapping("/getEpreuve/{id}")
    public ResponseEntity<EpreuveDTO> getEpreuve(@PathVariable Long id){
        EpreuveDTO epreuveDTO = epreuveService.getEpreuveById(id);
        return new ResponseEntity<>(epreuveDTO,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEpreuve(@PathVariable Long id){
        epreuveService.deleteEpreuve(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PutMapping("/updateEpreuve/{id}")
    public ResponseEntity<EpreuveDTO> updateEpreuve(@PathVariable Long id , @RequestBody EpreuveDTO epreuveDTO){
        EpreuveDTO epreuveDTOUpdated =epreuveService.updateEpreuve(id,epreuveDTO);
        return new ResponseEntity<>(epreuveDTOUpdated,HttpStatus.OK);
    }



}
