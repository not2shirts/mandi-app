package com.rdbac.rdbac.ServiceImplementation;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.security.config.annotation.rsocket.RSocketSecurity.JwtSpec;
import org.springframework.stereotype.Service;

import com.rdbac.rdbac.Helpers.HmacKey;

import com.rdbac.rdbac.Pojos.App_User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class JWTServiceImplementation {
    // will handle about the. USER .  role access can be give or not give based upon the things to be yet defined 
    // about we. can. have the. Secret key 
    /*
     * 
     * ven if you don’t use Auth0 as a plug-in, you can still:

Study their RBAC design (user roles, permissions)

Learn how they use scopes (read:org, write:repo)

See their invite flows (you send a signed link)

Learn from their JWT claim structure (e.g., permissions: [ ... ])

// if we want about the logout logic then we will have about the jit id that will handle about the things in the web app 

// now things come about that we can about. the. refresh logic then about. we can about the about the logic tp refrech to. tthat we 


do you nned about jit 
     * 
     */

     private SecretKey secretKey;
     public JWTServiceImplementation() {
        secretKey = HmacKey.builder().build().get_SecretKey();
        //System.out.println(secretKey);

     }

     public  String  genrateJwtToken(String  user_phone_number) {
        Map<String,Object> map  =  new  HashMap<>();
        return  Jwts.builder()

                    .subject(user_phone_number)
                    .id(UUID.randomUUID().toString())
                    .issuedAt(new  Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis()+(24000*3600)))
                    .claims(map)
                    .signWith(secretKey).compact();
                    
    }
    public String  getUserPhoneNumber(String token) {
        final  Claims  claims  =  Jwts
                                        .parser()
                                        .verifyWith(secretKey)
                                        .build()
                                        .parseSignedClaims(token)
                                        .getPayload();
        log.info(claims.getSubject()+"   "+ claims.getExpiration());
        return claims.getSubject();
    }

    public boolean validate(App_User user, String token) {
        // TODO Auto-generated method stub
        String  token_phoneNumber  = getUserPhoneNumber(token);
        return  ((user.getPhoneNumber().equals(token_phoneNumber)) &&   !isTokenExpired(token));  
    }
    private  boolean  isTokenExpired(String  token) {
        final  Claims  claims  =  Jwts
                                    .parser()
                                    .verifyWith(secretKey)
                                    .build()
                                    .parseSignedClaims(token)
                                    .getPayload();
        log.info(claims.getSubject()+"   "+ claims.getExpiration());
        return  claims.getExpiration().before(new  Date());

    }

}
