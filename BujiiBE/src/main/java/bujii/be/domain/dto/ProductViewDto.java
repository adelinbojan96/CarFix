package bujii.be.domain.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ProductViewDto {
    Integer id;
    String title;
    String description;
    Integer user_id;
    String seller_name;
    Float price;
    Integer quantity;
    Timestamp created_at;
    byte[] image;
    byte[] seller_picture;
}
