package lk.ac.kln.unimart_backend.auth.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lk.ac.kln.unimart_backend.auth.dto.UserCreateRequest;
import lk.ac.kln.unimart_backend.auth.dto.UserResponse;
import lk.ac.kln.unimart_backend.auth.dto.UserUpdateRequest;
import lk.ac.kln.unimart_backend.auth.entity.User;
import lk.ac.kln.unimart_backend.auth.repository.UserRepository;
import lk.ac.kln.unimart_backend.common.api.ResourceNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse createUser(UserCreateRequest request) {
        User user = new User();
        user.setUniversityEmail(request.getUniversityEmail().trim());
        user.setPasswordHash(passwordEncoder.encode(request.getPasswordHash()));
        user.setFullName(request.getFullName().trim());
        user.setRole(request.getRole());
        user.setEmailVerified(false);
        LocalDateTime now = LocalDateTime.now();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        User saved = userRepository.save(user);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        return toResponse(findUserOrThrow(id));
    }

    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = findUserOrThrow(id);
        user.setUniversityEmail(request.getUniversityEmail().trim());
        if (request.getPasswordHash() != null && !request.getPasswordHash().isEmpty()) {
            user.setPasswordHash(passwordEncoder.encode(request.getPasswordHash()));
        }
        user.setFullName(request.getFullName().trim());
        user.setRole(request.getRole());
        user.setEmailVerified(request.getEmailVerified());
        user.setUpdatedAt(LocalDateTime.now());

        return toResponse(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = findUserOrThrow(id);
        userRepository.delete(user);
    }

    private User findUserOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUniversityEmail(),
                user.getFullName(),
                user.getRole(),
                user.getEmailVerified(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
