package com.paint.services;


import com.paint.model.Prescription;

import java.util.List;

public interface PrescriptionService {
    Prescription addPrescriptionToPatient(Long id, Prescription prescription);

    List<Prescription> getPrescriptionsByUserId(long id);
}
