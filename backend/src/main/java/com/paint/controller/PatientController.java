package com.paint.controller;

import com.paint.model.Patient;
import com.paint.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PatientController {
    @Autowired
    private PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping("/patients")
    public Patient createPatient(@RequestBody Patient patient){
        return patientService.createPatient(patient);
    }

    @GetMapping("/patients")
    public List<Patient> getAllPatients(){
        return patientService.getAllPatients();
    }

    @DeleteMapping("/patients/{id}")
    public ResponseEntity<Map<String,Boolean>> deletePatient(@PathVariable Long id){
        boolean deleted=false;
        deleted= patientService.deletePatient(id);
        Map<String,Boolean> response=new HashMap<>();
        response.put("deleted",deleted);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/patients/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id){
        Patient patient=null;
        patient=patientService.getPatientById(id);
        return ResponseEntity.ok(patient);
    }

    @PutMapping("/patients/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id,
                                                 @RequestBody Patient patient){
        patient=patientService.updatePatient(id, patient);
        return ResponseEntity.ok(patient);
    }

}
