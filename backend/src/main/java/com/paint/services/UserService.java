package com.paint.services;


import com.paint.model.User;

import java.util.List;

public interface UserService {
    User createUser(User user);

    User authentication(User user);
}
