package com.paint.services;


import com.paint.entity.PatientEntity;
import com.paint.entity.VisitEntity;
import com.paint.model.Patient;
import com.paint.model.Visit;
import com.paint.repository.PatientRepository;
import com.paint.repository.VisitRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class VisitServiceImpl implements VisitService{
    private VisitRepository visitRepository;
    private PatientRepository patientRepository;

    public VisitServiceImpl(PatientRepository patientRepository, VisitRepository visitRepository)
    {
        this.visitRepository = visitRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public Visit addVisitToPatient(Long id, Visit visit) { //mamy "treść" wizyty
        PatientEntity patient = patientRepository.findById(id).get(); //mamy pacjenta który ma mieć wizyte
        String date=visit.getDate();
        VisitEntity savedVisit=new VisitEntity();
        savedVisit.setPatient(patient);
        savedVisit.setDate(date);
        visitRepository.save(savedVisit);
        BeanUtils.copyProperties(savedVisit, visit);
        return visit;
    }
}
