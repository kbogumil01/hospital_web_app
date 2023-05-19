package com.paint.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private String login;
    private String password;
    private String role;
}
