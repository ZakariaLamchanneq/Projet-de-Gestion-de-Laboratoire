package analyse.analyse.controller;

import analyse.analyse.dto.AnalyseDTO;
import analyse.analyse.service.AnalyseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analyses")
public class AnalyseController {

    @Autowired
    private AnalyseService analyseService;

    @PostMapping("/add")
    public ResponseEntity<AnalyseDTO> addAnalyse(@RequestBody AnalyseDTO analyseDTO){
        AnalyseDTO analyseCreated = analyseService.createAnalyse(analyseDTO);
        return new ResponseEntity<>(analyseCreated, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AnalyseDTO>> getAllAnalyses(){
        List<AnalyseDTO> analyseDTOList = analyseService.getAllAnalyses();
        return new ResponseEntity<>(analyseDTOList,HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<AnalyseDTO> getAnalyse(@PathVariable Long id){
        AnalyseDTO analyseDTO = analyseService.getAnalyseById(id).orElse(null);
        return new ResponseEntity<>(analyseDTO,HttpStatus.OK);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<AnalyseDTO> updateAnalyse(@PathVariable Long id, @RequestBody AnalyseDTO analyseDTO) {
        AnalyseDTO updatedAnalyse = analyseService.updateAnalyse(id, analyseDTO);
        return new ResponseEntity<>(updatedAnalyse, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAnalyse(@PathVariable Long id){
        analyseService.deleteAnalyse(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/laboratoire/{laboratoireId}")
    public ResponseEntity<List<AnalyseDTO>> getAnalysesByLaboratoireId(@PathVariable Long laboratoireId) {
        List<AnalyseDTO> analyses = analyseService.getAnalysesByLaboratoireId(laboratoireId);
        return new ResponseEntity<>(analyses, HttpStatus.OK);
    }
}