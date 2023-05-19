package com.paint.services;

import com.paint.entity.UserEntity;
import com.paint.model.User;
import com.paint.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;

    private final PasswordService passwordService;

    public UserServiceImpl(UserRepository userRepository, PasswordService passwordServie) {
        this.userRepository = userRepository;
        this.passwordService = passwordServie;
    }


    @Override
    public User createUser(User user) {
        if(userRepository.findByLogin(user.getLogin()).isEmpty()){ //jeżeli login nie jest zajęty
            UserEntity userEntity=new UserEntity();
            userEntity.setLogin(user.getLogin());
            userEntity.setRole(user.getRole());
            userEntity.setId(user.getId());
            userEntity.setPassword(passwordService.secure(user.getPassword())); //metoda secure hashuje alg. argon5
            userRepository.save(userEntity);
            user.setPassword("***"); //żeby w odpowiedzi nie było hasła
            return user;
        }else{
            return null;//new User(-1,"","","");
        }
    }

    @Override
    public User authentication(User user){ //co jesli dam zly login??? naprawione
        if(!userRepository.findByLogin(user.getLogin()).isEmpty()){ //jesli taki login istnieje w bazie
            String hash=userRepository.findByLogin(user.getLogin()).get(0).getPassword(); //bierzemy jego hash
            if(passwordService.validatePassword(hash,user.getPassword())){ //funkcja do sprawdzenia czy hasło sie zgadza
                // uwierzytelnianie się powiodło
                String role=userRepository.findByLogin(user.getLogin()).get(0).getRole(); //żeby serwer wiedział jaki typ usera sie zalogował
                user.setRole(role);
                return user;
            }else
            { //niepoprawne hasło
                return null;
            }
        }else{ //niepoprawny login
            return null;
        }
    }
}
