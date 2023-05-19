package com.paint.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name="patients")
public class PatientEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private String firstName;
    private String lastName;
    private String emailId;

    @OneToOne
    @JoinColumn(name="user_id")
    private UserEntity user;
}
