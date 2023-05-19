package com.paint.services;


import com.paint.model.Prescription;

public interface PrescriptionService {
    Prescription addPrescriptionToPatient(Long id, Prescription prescription);
}
