package bujii.be.domain.dto;

import java.sql.Timestamp;

public class ProductViewDto {
    Integer id;
    String title;
    String description;
    String seller_name;
    Float price;
    Integer quantity;
    Timestamp created_at;
    byte[] image;
}
