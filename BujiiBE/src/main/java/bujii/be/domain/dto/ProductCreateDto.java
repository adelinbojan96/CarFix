package bujii.be.domain.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductCreateDto {
    String title;
    String description;
    Float price;
    Integer quantity;
    String firm;
    String username;
    MultipartFile image;
}
