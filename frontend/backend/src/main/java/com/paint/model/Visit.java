package com.paint.model;

import com.paint.entity.PatientEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Visit {
    private long id;
    //private Date date;
    private String date;

    private Patient patient; //jako nośnik info nie potrzebuję tego parametru
}