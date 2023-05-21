package com.paint.services;

import com.paint.entity.PatientEntity;
import com.paint.model.Patient;
import com.paint.repository.PatientRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService{

    private PatientRepository patientRepository;

    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient createPatient(Patient patient){
        PatientEntity patientEntity=new PatientEntity();
        BeanUtils.copyProperties(patient, patientEntity);
        patientRepository.save(patientEntity);
        return patient;
    }

    @Override
    public List<Patient> getAllPatients() {
        List<PatientEntity> patientEntities = patientRepository.findAll();

        List<Patient> patients= patientEntities.stream().map(pat -> new Patient(
                pat.getId(),
                pat.getFirstName(),
                pat.getLastName(),
                pat.getEmailId(), null)) //przez to null może być newralgiczny punkt
                .collect(Collectors.toList());
        return patients;
    }

    @Override
    public boolean deletePatient(Long id) {
        PatientEntity patient= patientRepository.findById(id).get();
        patientRepository.delete(patient);
        return true;
    }

    @Override
    public Patient getPatientById(Long id) {
        PatientEntity patientEntity=patientRepository.findById(id).get();
        Patient patient = new Patient();
        BeanUtils.copyProperties(patientEntity, patient);
        return patient;
    }
    @Override
    public Patient updatePatient(Long id, Patient patient) {
        PatientEntity patientEntity=patientRepository.findById(id).get();
        patientEntity.setEmailId(patient.getEmailId());
        patientEntity.setFirstName(patient.getFirstName());
        patientEntity.setLastName(patient.getLastName());

        patientRepository.save(patientEntity);
        return patient;
    }

}
