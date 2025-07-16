package com.socialmedai.socialmediaapp.ServiceImpl;

import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Attempting to find user with email: " + email); // Debugging email
        User user = userRepo.findByEmail(email);

        if (user == null) {
            System.out.println("User not found for email: " + email); // Debugging user not found
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        System.out.println("Found user: " + user.getEmail() + " | Hashed Password: " + user.getPassword()); // Debugging found user
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }
}
