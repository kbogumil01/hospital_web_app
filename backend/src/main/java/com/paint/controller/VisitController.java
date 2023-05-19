package com.paint.controller;



import com.paint.entity.VisitEntity;
import com.paint.model.Patient;
import com.paint.model.Visit;
import com.paint.services.VisitService;
import jdk.jfr.Registered;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class VisitController {
    @Autowired
    private VisitService visitService;

    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @PostMapping("/addVisit/{id}") //dodanie wizyty do pacjenta o danym id
    public ResponseEntity<Visit> createVisit(@PathVariable Long id, @RequestBody Visit visit){
        visit=visitService.addVisitToPatient(id,visit);
        return ResponseEntity.ok(visit);
    }

}
