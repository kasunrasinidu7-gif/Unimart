package lk.ac.kln.unimart_backend.auth.service;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lk.ac.kln.unimart_backend.auth.entity.User;
import lk.ac.kln.unimart_backend.auth.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String universityEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUniversityEmail(universityEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + universityEmail));

        return new org.springframework.security.core.userdetails.User(
                user.getUniversityEmail(),
                user.getPasswordHash(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}
