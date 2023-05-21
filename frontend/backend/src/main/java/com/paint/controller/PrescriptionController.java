package com.paint.controller;


import com.paint.model.Prescription;
import com.paint.model.Visit;
import com.paint.services.PrescriptionService;
import com.paint.services.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PrescriptionController {
    @Autowired
    private PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping("/addPrescription/{id}") //dodanie wizyty do pacjenta o danym id
    public ResponseEntity<Prescription> createVisit(@PathVariable Long id, @RequestBody Prescription prescription){
        prescription=prescriptionService.addPrescriptionToPatient(id,prescription);
        return ResponseEntity.ok(prescription);
    }

}
