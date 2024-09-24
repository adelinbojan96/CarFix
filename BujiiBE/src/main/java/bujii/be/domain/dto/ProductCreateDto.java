package bujii.be.domain.dto;

import lombok.Data;

@Data
public class ProductCreateDto {
    String title;
    String description;
    Float price;
    Integer quantity;
    String firm;
    String username;
    byte[] image;
}
