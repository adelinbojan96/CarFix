package bujii.be.controller;

import bujii.be.domain.dto.LoginDto;
import bujii.be.domain.dto.LoginViewDto;
import bujii.be.domain.dto.UserCreateDto;
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

    @PostMapping(value = "/upload-profile-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadProfileImage(
            @RequestParam String username,
            @RequestPart("image") MultipartFile image) {
        try {
            userService.saveProfileImage(username, image);
            return new ResponseEntity<>("Profile image uploaded successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to upload image: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/profile-image")
    public ResponseEntity<String> getProfileImage(@RequestParam String username) {
        byte[] image = userService.loadImageFromDatabase(username);
        if (image == null) {
            try {
                ClassPathResource defaultImageResource = new ClassPathResource("static/default_user.png");
                image = StreamUtils.copyToByteArray(defaultImageResource.getInputStream());
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        String base64Image = Base64.getEncoder().encodeToString(image);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(base64Image);
    }

    @PostMapping("/seller")
    public void setUserAsSeller(@RequestBody String username) {
        userService.setUserAsSeller(username);
    }
}
