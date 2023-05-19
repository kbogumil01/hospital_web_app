package com.paint.controller;

import com.paint.model.User;
import com.paint.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie; //zmieniłem z javax na jakarta (działa)
import jakarta.servlet.http.HttpServletResponse;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;


@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
    @Autowired
    private UserService userService;

    private SecretKey secretKey = KeyGenerator.getInstance("HmacSHA256").generateKey(); //klucz do podpisywania jwt

    //private String klucz="key"; //klucz testowy

    public UserController(UserService userService) throws NoSuchAlgorithmException {
        this.userService = userService;
    }

    @PostMapping("/register") //rejestracja
    public ResponseEntity<User> createUser (@RequestBody User user) {
        user = userService.createUser(user);
        if (user==null){
            return ResponseEntity.status(409).body(null); //jesli login jest już zajęty
        } else {
            return ResponseEntity.ok(user);
        }
    }

    @PostMapping("/login") //logowanie
    public ResponseEntity<User> authentication(@RequestBody User user, HttpServletResponse response){
        user=userService.authentication(user);
        if(user!=null){
            user.setPassword("***");

            JwtBuilder builder = Jwts.builder()
                    .setHeaderParam("type", "JWT")
                    .setSubject(user.getLogin())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + (45*60*1000))) //45 minut
                    .claim("role", user.getRole());

            String jwt = builder.signWith(SignatureAlgorithm.HS256, secretKey).compact();
            //System.out.println("\nklucz: "+Base64.getEncoder().encodeToString(secretKey.getEncoded()));
            //System.out.println("\ntoken: "+jwt);

            Cookie cookie = new Cookie("jwt", jwt);
            cookie.setHttpOnly(false); //jeśli true to nie mogę przeglądać zawartości.
            cookie.setMaxAge(60*45); // 45 min
            cookie.setPath("/");
            //System.out.println("\n"+cookie+"\n");
            response.addCookie(cookie);

            return ResponseEntity.ok(user);
        }
        else{
            return ResponseEntity.status(401).body(null);
        }

    }

    @GetMapping("/auth") //autoryzacja, weryfikacja uprawnień za pomocą tokenu (sprawdzenie, czy token nie został podmieniony)
    public boolean authUser (HttpServletRequest request) {
        Cookie[] cookies=request.getCookies();
        if(cookies != null){
            for(Cookie cookie: cookies) {
                if (cookie.getName().equals("jwt")) { //jeśli bedzie nasz token wsrod plikow cookie
                    String value=cookie.getValue();
                    //System.out.println("\nklucz: "+Base64.getEncoder().encodeToString(secretKey.getEncoded()));
                    //System.out.println("\ntoken: "+value);

                    try {
                        Jwts.parser().setSigningKey(secretKey).parseClaimsJws(value);
                        //System.out.println("udalo sie");
                        return true; //autoryzacja udana
                    }
                    catch(Exception e){
                        System.out.println(e);
                        return false;
                    }
                }
            }
        }
        //System.out.println("nie udalo sie");
        return false;
    }

}
