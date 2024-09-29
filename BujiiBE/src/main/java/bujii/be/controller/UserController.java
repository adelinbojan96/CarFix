package bujii.be.controller;

import bujii.be.domain.dto.LoginDto;
import bujii.be.domain.dto.LoginViewDto;
import bujii.be.domain.dto.UserCreateDto;
import bujii.be.domain.dto.UserViewDto;
import bujii.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@CrossOrigin
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public LoginViewDto login(@RequestBody LoginDto loginDto) {
        return userService.login(loginDto);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public void register(@RequestBody UserCreateDto userCreateDto) {
        userService.register(userCreateDto);
    }

    @PostMapping("/profile")
    @ResponseStatus(HttpStatus.OK)
    public void editProfile(@RequestParam String formerUsername, @RequestBody UserCreateDto userCreateDto) {
        userService.editProfile(formerUsername, userCreateDto);
    }

    @GetMapping("/{username}")
    public UserViewDto[] getAllUsersExceptMe(@PathVariable String username){
        return userService.getAllUsersExceptMe(username);
    }

}
