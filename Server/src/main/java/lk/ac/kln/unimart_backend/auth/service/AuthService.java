package lk.ac.kln.unimart_backend.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import lk.ac.kln.unimart_backend.auth.dto.AuthResponse;
import lk.ac.kln.unimart_backend.auth.dto.LoginRequest;
import lk.ac.kln.unimart_backend.auth.entity.User;
import lk.ac.kln.unimart_backend.auth.repository.UserRepository;
import lk.ac.kln.unimart_backend.common.api.ResourceNotFoundException;
import lk.ac.kln.unimart_backend.security.jwt.JwtService;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public AuthResponse login(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUniversityEmail(),
                            request.getPassword()
                    )
            );

            User user = userRepository.findByUniversityEmail(request.getUniversityEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getUniversityEmail()));

            String token = jwtService.generateToken(user);
            return new AuthResponse(token, user.getUniversityEmail(), user.getRole().name());

        } catch (AuthenticationException ex) {
            throw new IllegalArgumentException("Invalid email or password");
        }
    }
}
