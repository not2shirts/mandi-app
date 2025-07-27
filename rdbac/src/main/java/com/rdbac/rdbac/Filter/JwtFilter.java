package com.rdbac.rdbac.Filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.rdbac.rdbac.Pojos.App_User;
import com.rdbac.rdbac.ServiceImplementation.JWTServiceImplementation;
import com.rdbac.rdbac.ServiceImplementation.UserServiceImplementation;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtFilter extends OncePerRequestFilter  {

    private JWTServiceImplementation jwtServiceImplementation;
    private UserServiceImplementation userServiceImplementation;
    public JwtFilter(JWTServiceImplementation jwtServiceImplementation,
                    UserServiceImplementation userServiceImplementation
    ) {
        this.userServiceImplementation = userServiceImplementation;
        this.jwtServiceImplementation = jwtServiceImplementation;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // TODO Auto-generated method stub
        // get the Token from the request header and verify that
        String requestUri = request.getRequestURI();
        log.info(requestUri);
        if(requestUri.startsWith("/auth") || requestUri.contains("/email/accept") || requestUri.contains("/access/check") ||
                requestUri.contains("/v3") || requestUri.contains( "/swagger-ui") || requestUri.contains("/actutaor")
        
        ) {filterChain.doFilter(request, response); return ;}
        String autheader = request.getHeader("Authorization");
        if(!autheader.isEmpty() && autheader.startsWith("Bearer")) {
            String token = autheader.substring(7); // you have the. token . i donot have the password maccah 
            String user_phone = jwtServiceImplementation.getUserPhoneNumber(token);

            if(!user_phone.isEmpty() && SecurityContextHolder.getContext().getAuthentication() == null) {
                // you nned to fetch about the user here adn get the data. // now so we can also add about the 
                App_User userDetails = (App_User) userServiceImplementation.loadUserByUsername(user_phone);
                if(jwtServiceImplementation.validate(userDetails, token)) {
                    UsernamePasswordAuthenticationToken  token2 =  new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                     token2.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(token2);
        
                        log.info("Authentication successful for user: " + user_phone);
                }
            }

            // 
        }
        filterChain.doFilter(request, response);
    }

}
