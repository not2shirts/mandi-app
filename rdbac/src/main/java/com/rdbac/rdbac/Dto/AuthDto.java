package com.rdbac.rdbac.Dto;

import com.rdbac.rdbac.Pojos.UserType;
import lombok.Data;

@Data
public class AuthDto {
    
    private String phoneNumber;
    private String password;
    private String name; // For registration
    private UserType userType; // For registration - VENDOR or SUPPLIER
    private String businessName; // For registration
    private String businessAddress; // For registration
}
