package com.rdbac.rdbac.Helpers;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Base64;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import lombok.Builder;

@Builder
public class HmacKey {

   
    private String jwt_key =  System.getenv("JWT_KEY");
    public SecretKey get_SecretKey() {
        
                
                System.out.println("The is Key. is. = " + jwt_key);
                byte[] decoded = Base64.getDecoder().decode(jwt_key);
                return new SecretKeySpec(decoded, "HmacSHA256");

                
       
    }
}
