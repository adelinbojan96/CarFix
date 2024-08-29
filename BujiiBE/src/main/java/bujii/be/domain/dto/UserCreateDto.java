package bujii.be.domain.dto;

import lombok.Data;

@Data
public class UserCreateDto {
    String username;
    String email;
    String password;
}
