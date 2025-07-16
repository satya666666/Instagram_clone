package com.socialmedai.socialmediaapp.Controller;

import com.socialmedai.socialmediaapp.Repository.UserRepo;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.ServiceImpl.CustomUserDetailsService;
import com.socialmedai.socialmediaapp.config.JwtProvider;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import com.socialmedai.socialmediaapp.response.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/auth")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping(path = "/signup")
    public AuthResponse createUser(@RequestBody UserDto userDto) throws Exception {
        User existingUser = userRepo.findByEmail(userDto.getEmail());
        if (existingUser != null) throw new Exception("This email is already used with another account");

        User newUser = new User();
        newUser.setEmail(userDto.getEmail());
        newUser.setFirstName(userDto.getFirstName());
        newUser.setLastName(userDto.getLastName());

        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        System.out.println("Raw Password: " + userDto.getPassword()); // Debugging
        System.out.println("Encoded Password: " + encodedPassword);   // Debugging
        newUser.setPassword(encodedPassword);
        newUser.setGender(userDto.getGender());

        User savedUser = userRepo.save(newUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        String token = JwtProvider.generateToken(authentication);

        return new AuthResponse(token, "Successfully Registered");
    }

    @PostMapping(path = "/signin")
    public AuthResponse signin(@RequestBody UserDto userDto) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(userDto.getEmail());

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username or password");
        }

        // Debugging: Log the password comparison
        System.out.println("Stored Hashed Password: " + userDetails.getPassword()); // Debugging stored password
        System.out.println("Raw Input Password: " + userDto.getPassword());    // Debugging input password

        // Check if the passwords match
        if (!passwordEncoder.matches(userDto.getPassword(), userDetails.getPassword())) {
            System.out.println("Password Mismatch!"); // Debugging mismatch
            throw new BadCredentialsException("Invalid username or password");
        }

        // Generate JWT token if passwords match
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
        String token = JwtProvider.generateToken(authentication);

        return new AuthResponse(token, "Successfully Logged In");
    }


}
