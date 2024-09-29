package bujii.be.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserViewDto {
    Integer id;
    String name;
    String role;
    Integer messages;
    byte[] avatar;
}
