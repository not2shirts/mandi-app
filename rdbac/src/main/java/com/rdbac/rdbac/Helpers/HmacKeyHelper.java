package com.rdbac.rdbac.Helpers;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Base64;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import lombok.Builder;

@Builder
public class HmacKeyHelper {

    public SecretKey get_SecretKey() {
        try (FileReader fileReader = new FileReader("/Users/ansh/Desktop/to_do_list/Spring_boot_projects/Clone/rdbac/src/main/resources/keys/JWT.pem");
             BufferedReader bufferedReader = new BufferedReader(fileReader)) {
                String key = bufferedReader.readLine();
                System.out.println("The is Key. is. = " + key);
                byte[] decoded = Base64.getDecoder().decode(key);
                return new SecretKeySpec(decoded, "HmacSHA256");

                
        } catch (Exception e) {
            throw new RuntimeException("Failed to read secret key", e);
        }
    }
}
