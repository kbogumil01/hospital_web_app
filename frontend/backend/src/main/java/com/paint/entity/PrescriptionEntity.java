package com.paint.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="prescriptions")
public class PrescriptionEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    //private Date date;
    private String description;
    @ManyToOne
    @JoinColumn(name="patient_id")
    private PatientEntity patient;
}
