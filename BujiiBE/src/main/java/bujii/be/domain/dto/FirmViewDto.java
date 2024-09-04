package bujii.be.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FirmViewDto {
    Integer id;
    String name;
    byte[] image;
}
