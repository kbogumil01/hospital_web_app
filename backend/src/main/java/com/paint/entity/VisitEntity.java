package com.paint.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name="visits")
public class VisitEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    //private Date date;
    private String date;
    @ManyToOne
    @JoinColumn(name="patient_id")
    private PatientEntity patient;
}
