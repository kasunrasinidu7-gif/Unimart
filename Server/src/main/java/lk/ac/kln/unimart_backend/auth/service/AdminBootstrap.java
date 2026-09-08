package lk.ac.kln.unimart_backend.auth.service;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lk.ac.kln.unimart_backend.auth.entity.User;
import lk.ac.kln.unimart_backend.auth.entity.UserRole;
import lk.ac.kln.unimart_backend.auth.repository.UserRepository;

@Component
public class AdminBootstrap implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminBootstrap(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String adminEmail = "admin@unimart.com";

        userRepository.findByUniversityEmail(adminEmail).ifPresentOrElse(
                user -> {
                },
                () -> {
                    User admin = new User();
                    admin.setUniversityEmail(adminEmail);
                    admin.setPasswordHash(passwordEncoder.encode("Admin123!"));
                    admin.setFullName("System Admin");
                    admin.setRole(UserRole.ADMIN);
                    admin.setEmailVerified(true);
                    LocalDateTime now = LocalDateTime.now();
                    admin.setCreatedAt(now);
                    admin.setUpdatedAt(now);
                    userRepository.save(admin);
                }
        );
    }
}
