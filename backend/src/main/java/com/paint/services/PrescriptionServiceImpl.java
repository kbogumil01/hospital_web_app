package com.paint.services;

import com.paint.entity.PatientEntity;
import com.paint.entity.PrescriptionEntity;
import com.paint.entity.VisitEntity;
import com.paint.model.Prescription;
import com.paint.model.Visit;
import com.paint.repository.PatientRepository;
import com.paint.repository.PrescriptionRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class PrescriptionServiceImpl implements PrescriptionService{
    private PrescriptionRepository prescriptionRepository;
    private PatientRepository patientRepository;

    public PrescriptionServiceImpl(PrescriptionRepository prescriptionRepository,PatientRepository patientRepository)
    {
        this.prescriptionRepository=prescriptionRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public Prescription addPrescriptionToPatient(Long id, Prescription prescription) {
        PatientEntity patient = patientRepository.findById(id).get(); //mamy pacjenta który ma mieć wizyte
        String description=prescription.getDescription();
        PrescriptionEntity savedPrescription=new PrescriptionEntity();
        savedPrescription.setPatient(patient);
        savedPrescription.setDescription(description);
        prescriptionRepository.save(savedPrescription);
        BeanUtils.copyProperties(savedPrescription, prescription);
        return prescription;
    }

    @Override
    public List<Prescription> getPrescriptionsByUserId(long id) {
        List<PrescriptionEntity> prescriptionEntities = prescriptionRepository.findByPatientId(id);

        List<Prescription> prescriptions= prescriptionEntities.stream().map(pres -> new Prescription(
                        pres.getId(),
                        pres.getDescription(),
                        null)) //przez to null może być newralgiczny punkt
                .collect(Collectors.toList());
        return prescriptions;
    }
}
