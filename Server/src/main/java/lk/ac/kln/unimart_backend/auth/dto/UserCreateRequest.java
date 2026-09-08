package lk.ac.kln.unimart_backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lk.ac.kln.unimart_backend.auth.entity.UserRole;

public class UserCreateRequest {

    @NotBlank(message = "University email is required")
    @Email(message = "University email must be a valid email address")
    private String universityEmail;

    @NotBlank(message = "Password hash is required")
    @Size(max = 255, message = "Password hash must not exceed 255 characters")
    private String passwordHash;

    @NotBlank(message = "Full name is required")
    @Size(max = 150, message = "Full name must not exceed 150 characters")
    private String fullName;

    @NotNull(message = "Role is required")
    private UserRole role;

    public UserCreateRequest() {
    }

    public UserCreateRequest(String universityEmail, String passwordHash, String fullName, UserRole role) {
        this.universityEmail = universityEmail;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.role = role;
    }

    public String getUniversityEmail() {
        return universityEmail;
    }

    public void setUniversityEmail(String universityEmail) {
        this.universityEmail = universityEmail;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}
