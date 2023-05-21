package com.paint.services;

import com.paint.entity.VisitEntity;
import com.paint.model.Patient;
import com.paint.model.Visit;

import java.util.List;

public interface VisitService {

    Visit addVisitToPatient(Long id, Visit visit);
}
