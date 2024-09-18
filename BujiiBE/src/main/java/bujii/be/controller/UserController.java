package bujii.be.controller;

import bujii.be.domain.dto.LoginDto;
import bujii.be.domain.dto.LoginViewDto;
import bujii.be.domain.dto.UserCreateDto;
import bujii.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

}
