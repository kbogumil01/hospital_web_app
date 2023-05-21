package com.paint.services;

import com.paint.model.Patient;

import java.util.List;

public interface PatientService {
    Patient getPatientById(Long id);

    Patient createPatient(Patient patient);

    List<Patient> getAllPatients();

    boolean deletePatient(Long id);

    Patient updatePatient(Long id, Patient patient);
}
