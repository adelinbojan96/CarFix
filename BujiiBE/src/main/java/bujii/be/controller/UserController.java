package bujii.be.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.catalina.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "User API", description = "Operations related to users")
public class UserController {
    @GetMapping("/")
    public List<String> getUsers(){
        return Arrays.asList("Ion", "Ana");
    }
}
