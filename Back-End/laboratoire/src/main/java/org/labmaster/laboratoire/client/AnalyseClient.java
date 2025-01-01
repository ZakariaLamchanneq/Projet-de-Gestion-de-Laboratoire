package org.labmaster.laboratoire.client;

import org.labmaster.laboratoire.dto.analyse.AnalyseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "analyse-microservice", url = "${application.config.analyses-url}")
public interface AnalyseClient {

    @GetMapping("/laboratoire/{laboratoireId}")
    List<AnalyseDTO> getAnalysesByLaboratoireId(@PathVariable("laboratoireId") Long laboratoireId);
}