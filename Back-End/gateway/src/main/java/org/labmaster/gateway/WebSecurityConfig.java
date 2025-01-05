package org.labmaster.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {

        return http
                .csrf(csrf -> csrf.disable())
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/auth/login").permitAll() // Allow login for everyone
                        .pathMatchers("/api/utilisateurs/verify").permitAll() // Allow verification
                        .pathMatchers("/api/utilisateurs/request").permitAll()
                        .pathMatchers("/api/utilisateurs/reset").permitAll()
                        .pathMatchers("/api/utilisateurs/**").hasAnyRole("ADMINISTRATEUR", "ADMIN_LABO","TECHNICIEN")
                        .pathMatchers("/api/patients/**").hasAnyRole("ADMINISTRATEUR", "TECHNICIEN","ADMIN_LABO") // Access for ADMIN or TECHNICIAN
                        .pathMatchers("/api/laboratoires/find/{id}").hasAnyRole("ADMIN_LABO","ADMINISTRATEUR","TECHNICIEN") // Access for ADMIN only
                        .pathMatchers("/api/laboratoires/**").hasRole("ADMINISTRATEUR") // Access for ADMIN only
                        .pathMatchers("/api/adresses/**").hasAnyRole("ADMINISTRATEUR", "TECHNICIEN","ADMIN_LABO")  // Access for ADMIN only

                        .anyExchange().authenticated() // Any other requests require authentication
                )
                .addFilterAt(corsWebFilter(), SecurityWebFiltersOrder.CORS) // Ensure CORS is processed
                .addFilterAt(jwtAuthenticationFilter(), SecurityWebFiltersOrder.AUTHENTICATION) // Add JWT filter
                .build();

    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:4200"); // Ajoutez votre origine frontend
        corsConfig.addAllowedMethod("*");
        corsConfig.addAllowedHeader("*");
        corsConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }





    // Create JWT Authentication Filter
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

}


