package com.rdbac.rdbac.Pojos;

import com.rdbac.rdbac.Pojos.Enums.Login_Mode;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Document
@Data
@Getter
@Setter
public class App_User  implements UserDetails {

    @Id
    private String userId;
    private String name;
    private String password;
    private Date dateJoined;
    
    
    private String phoneNumber;
    private String email;
    private List<String> organisationId;
    private UserType userType; // VENDOR or SUPPLIER
    private String businessName; // Name of the business/shop
    private String businessAddress; // Business address
    private Boolean isVerified; // Whether the user is verified

    private Login_Mode loginMode = Login_Mode.Self; // login mode for teh  user as if we are going to povide about the Oauth

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (userType != null) {
            return List.of(new SimpleGrantedAuthority("ROLE_" + userType.name()));
        }
        return List.of(new SimpleGrantedAuthority("ROLE_VENDOR")); // Default role
    }
    

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return phoneNumber;
    }

    @Override
    public boolean isAccountNonExpired() { // so this is the main reasone we need to talk aboout 
        // Returning false will reject login even with correct credentials. that is the major caused that is happeing 
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean isValidIndianPhoneNumber(String phoneNumber) {
    return phoneNumber != null && phoneNumber.matches("^[6-9]\\d{9}$");
}

}
