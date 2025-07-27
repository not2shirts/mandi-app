package com.rdbac.rdbac.Configuration;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.rdbac.rdbac.Filter.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private JwtFilter jwtFilter;

   public SecurityConfiguration(JwtFilter jwtFilter) {
    this.jwtFilter = jwtFilter;
   }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity ) throws Exception {
            httpSecurity.csrf(csrf -> csrf.disable())
                    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .authorizeHttpRequests(auth -> {
                        // Public endpoints - no authentication required
                        auth.requestMatchers("/auth/**", "/email/accept/**", "/access/check").permitAll();
                        auth.requestMatchers("/v3/**", "/swagger-ui/**", "/swagger-ui.html" ,"/actuator/**").permitAll();
                        
                        // Product endpoints - role-based access
                        auth.requestMatchers("/products/create", "/products/*/update", "/products/*/delete", "/products/my-products", "/products/*/deactivate", "/products/*/quantity").hasRole("SUPPLIER");
                        auth.requestMatchers("/products/all", "/products/category/**", "/products/search", "/products/*")
                            .hasAnyRole("VENDOR", "SUPPLIER");
                        
                        // Order endpoints - role-based access
                        auth.requestMatchers("/orders/place", "/orders/my-orders", "/orders/*/cancel")
                            .hasRole("VENDOR");
                        auth.requestMatchers("/orders/supplier/**")
                            .hasRole("SUPPLIER");
                        auth.requestMatchers("/orders/*")
                            .hasAnyRole("VENDOR", "SUPPLIER");
                        
                        // Organization endpoints - existing role-based access
                        auth.requestMatchers("/organisation/create").hasAnyRole("SUPPLIER", "VENDOR");
                        auth.requestMatchers("/organisation/*/info").hasAnyRole("SUPPLIER", "VENDOR", "ADMIN", "VIEWER", "EDITOR");
                        auth.requestMatchers("/organisation/*/members").hasAnyRole("SUPPLIER", "VENDOR", "ADMIN", "VIEWER", "EDITOR");
                        auth.requestMatchers("/organisation/all").hasAnyRole("SUPPLIER", "VENDOR", "ADMIN");
                        
                        // Email invite endpoints
                        auth.requestMatchers("/email/invite/**").hasAnyRole("SUPPLIER", "VENDOR", "ADMIN");
                        
                        // Role and permission endpoints
                        auth.requestMatchers("/role/**").hasAnyRole("SUPPLIER", "VENDOR", "ADMIN");
                        
                        // Any other request requires authentication
                        auth.anyRequest().authenticated();
                    })
                    .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                    .cors((cors) -> {
                        corsConfigurationSource();
                    })
                    ;

        return  httpSecurity.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*")); // Allow all origins
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return (CorsConfigurationSource) source;
    }
}
