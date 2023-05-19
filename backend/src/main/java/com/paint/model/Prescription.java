package com.paint.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Prescription {
    private long id;
    private String description;
    private Patient patient;
}