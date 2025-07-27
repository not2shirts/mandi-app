package com.rdbac.rdbac.RestControllers;

import com.rdbac.rdbac.Dto.AuthDto;
import com.rdbac.rdbac.ServiceImplementation.AuthServiceImplementation;
import com.rdbac.rdbac.ServiceImplementation.JWTServiceImplementation;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    // we  will authicatie the  means about signup and login and logout request must be  followd here

    private final AuthServiceImplementation authServiceImplementation;

    public  AuthController(AuthServiceImplementation authServiceImplementation) {
        this.authServiceImplementation = authServiceImplementation;
    }
    @PostMapping("/signup")
    public String App_User_Signup(@RequestBody AuthDto authDto) {
        return authServiceImplementation.signup(authDto);
    }

    @PostMapping("/login")
    public String App_User_Login(@RequestBody  AuthDto authDto) {
       
        return authServiceImplementation.customAuth(authDto);
    }
    @PostMapping("/login1")
    public String App_User_Login1(@RequestBody AuthDto authDto) throws NoSuchAlgorithmException {
        
    KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
    SecretKey key = keyGen.generateKey();
    byte[] keyBytes = key.getEncoded();
    String base64Key = Base64.getEncoder().encodeToString(keyBytes);

    System.out.println("Your HMAC Key: " + base64Key);

        System.out.println("Login For Methods name {App_User_Login1 is  called}" );
        return authServiceImplementation.customAuth(authDto);
    }


}
