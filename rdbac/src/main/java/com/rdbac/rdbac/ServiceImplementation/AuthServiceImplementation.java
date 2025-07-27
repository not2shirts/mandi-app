package com.rdbac.rdbac.ServiceImplementation;

import com.rdbac.rdbac.Dto.AuthDto;
import com.rdbac.rdbac.Pojos.App_User;
import com.rdbac.rdbac.Repositry.App_User_Repositry;
import com.rdbac.rdbac.Service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service // here we are  using about the custom logs we nned to optimise about this also
public class AuthServiceImplementation implements AuthService {

    private App_User_Repositry appUserRepositry;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private JWTServiceImplementation jwtServiceImplementation;

    public AuthServiceImplementation(App_User_Repositry appUserRepositry,
                                     AuthenticationManager authenticationManager,
                                     PasswordEncoder passwordEncoder,
                                    JWTServiceImplementation jwtServiceImplementation) {
        this.authenticationManager = authenticationManager;
        this.appUserRepositry = appUserRepositry;
        this.passwordEncoder = passwordEncoder;
        this.jwtServiceImplementation = jwtServiceImplementation;
    }
    @Override
    public String customAuth(AuthDto authDto) {
        // means about means about find about the  data  we  nned sorry about your database about it
       // And then  print
        log.info("User Attempts to log {} ", authDto.toString());
        Authentication authentication =  authenticationManager.authenticate(
                                            new UsernamePasswordAuthenticationToken(authDto.getPhoneNumber(),authDto.getPassword())
                    );
        log.warn("User is {}", authentication.isAuthenticated());
        // till then  we  are  not providng about the   roiles  to  the   user   like we have the
        // we have tje   table  about the   org_menrtto chekc  aboutth e role  we  are here abbout the assingf them

        if(!authentication.isAuthenticated()) throw  new RuntimeException("User not Authenticated");

        log.warn("User is {}", authentication.isAuthenticated());
        // now here you can gernate about the  jWT Token about the   the   user and they  can  help
        return jwtServiceImplementation.genrateJwtToken(authDto.getPhoneNumber());
    }

    @Override
    public String signup(AuthDto authDto) {
        // this si about  the  signip
        Optional<App_User> appUser  =  appUserRepositry.findByPhoneNumber(authDto.getPhoneNumber());
        if(appUser.isPresent()) throw new RuntimeException("Phone Number Already Exist");
        
        // Validate phone number format
        App_User tempUser = new App_User();
        if (!tempUser.isValidIndianPhoneNumber(authDto.getPhoneNumber())) {
            throw new RuntimeException("Invalid phone number format. Must be a valid Indian phone number.");
        }
        
        // see about that we are going to signup  teh  user so save  then  using  this  . but later we are  going
        // to  update about the  data we are going to ask about themm about the  information like another form that they are  going to  see about andd they  will update t he
        // and when we will have about trhe  things  and  sned he  map ofteh  dta o  rhe   object in  the froent
        // we  will  send the jwt token and then to  the values
        App_User appUser1 = new App_User();
        appUser1.setPhoneNumber(authDto.getPhoneNumber());
        appUser1.setPassword(passwordEncoder.encode(authDto.getPassword()));
        appUser1.setUserId(UUID.randomUUID().toString());
        appUser1.setDateJoined(new Date());
        appUser1.setName(authDto.getName());
        appUser1.setUserType(authDto.getUserType() != null ? authDto.getUserType() : com.rdbac.rdbac.Pojos.UserType.VENDOR);
        appUser1.setBusinessName(authDto.getBusinessName());
        appUser1.setBusinessAddress(authDto.getBusinessAddress());
        appUser1.setIsVerified(false); // New users are not verified by default
        
        // woh. will save in the data abse 
        appUserRepositry.save(appUser1);
        return jwtServiceImplementation.genrateJwtToken(authDto.getPhoneNumber());
    }
}
