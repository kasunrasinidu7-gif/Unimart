package lk.ac.kln.unimart_backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "Email address is required")
    @Email(message = "Must be a valid email address")
    private String universityEmail;

    @NotBlank(message = "Password is required")
    private String password;

    public LoginRequest() {
    }

    public String getUniversityEmail() {
        return universityEmail;
    }

    public void setUniversityEmail(String universityEmail) {
        this.universityEmail = universityEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
