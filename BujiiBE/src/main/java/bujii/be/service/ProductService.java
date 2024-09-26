package bujii.be.service;

import bujii.be.domain.dto.ProductCreateDto;
import bujii.be.domain.dto.ProductViewDto;

public interface ProductService {
    void addProduct(ProductCreateDto product);
    ProductViewDto[] retrieveByName(String text);
    ProductViewDto[] retrieveByCategory(String text);
}
