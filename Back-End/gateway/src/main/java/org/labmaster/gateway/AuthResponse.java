package org.labmaster.gateway;

public class AuthResponse {

    private String token;

    // Constructeur
    public AuthResponse(String token) {
        this.token = token;
    }

    // Getter et Setter
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}