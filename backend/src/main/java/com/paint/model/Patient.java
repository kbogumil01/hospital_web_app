package com.paint.model;

import com.paint.entity.VisitEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
    private long id;
    private String firstName;
    private String lastName;
    private String emailId;
    private User user;

}
