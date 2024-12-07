package org.labmaster.gateway;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;

import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthenticationFilter implements WebFilter {

    private static final String BEARER_PREFIX = "Bearer ";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String token = extractToken(exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION));

        if (token != null && !token.isEmpty()) {
            return validateToken(token)
                    .flatMap(authentication -> {
                        return chain.filter(exchange)
                                .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication)); // Use ReactiveSecurityContextHolder
                    });
        }

        return chain.filter(exchange);
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER_PREFIX)) {
            return authorizationHeader.substring(BEARER_PREFIX.length());
        }
        return null;
    }

    private Mono<UsernamePasswordAuthenticationToken> validateToken(String token) {
        try {
            // Parse the token and extract the username
            String username = Jwts.parser()
                    .setSigningKey("your-secure-secret-key")  // Replace with your actual secret key
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();

            // Extract roles from the token (assuming roles are stored in the 'role' claim as a string or list)
            List<SimpleGrantedAuthority> authorities = extractRolesFromToken(token);

            System.out.println("Username: " + username + ", Authorities: " + authorities); // Debug info
            return Mono.just(new UsernamePasswordAuthenticationToken(username, null, authorities));
        } catch (JwtException e) {
            System.out.println("Token validation failed: " + e.getMessage()); // Debug info
            return Mono.empty(); // Token validation failed
        }
    }

    private List<SimpleGrantedAuthority> extractRolesFromToken(String token) {
        // Parse the token and extract the "role" claim
        Object rolesClaim = Jwts.parser()
                .setSigningKey("your-secure-secret-key")  // Replace with your actual secret key
                .parseClaimsJws(token)
                .getBody()
                .get("role");

        // If the roles claim is a string, convert it into a single element list
        if (rolesClaim instanceof String) {
            return List.of(new SimpleGrantedAuthority("ROLE_" + rolesClaim)); // Add the ROLE_ prefix
        }

        // If the roles claim is a list, map it to SimpleGrantedAuthority
        if (rolesClaim instanceof List) {
            @SuppressWarnings("unchecked")
            List<String> roles = (List<String>) rolesClaim;
            return roles.stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role))  // Add ROLE_ prefix to each role
                    .collect(Collectors.toList());
        }

        // Default case (no roles or invalid role claim)
        return List.of();
    }


}
