package lk.ac.kln.unimart_backend.auth.dto;

public class AuthResponse {

    private String token;
    private String tokenType = "Bearer";
    private String universityEmail;
    private String role;

    public AuthResponse() {
    }

    public AuthResponse(String token, String universityEmail, String role) {
        this.token = token;
        this.universityEmail = universityEmail;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getUniversityEmail() {
        return universityEmail;
    }

    public void setUniversityEmail(String universityEmail) {
        this.universityEmail = universityEmail;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
