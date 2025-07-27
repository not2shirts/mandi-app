package com.rdbac.rdbac.Helpers;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Base64;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import lombok.Builder;

@Builder
public class HmacKey {

   
   
    private String jwt_key =  "";
    public SecretKey get_SecretKey() {
        
                
                System.out.println("The is Key. is. = " + System.getenv("JWT_KEY"));
                byte[] decoded = Base64.getDecoder().decode(System.getenv("JWT_KEY"));
                return new SecretKeySpec(decoded, "HmacSHA256");

                
       
    }
}
