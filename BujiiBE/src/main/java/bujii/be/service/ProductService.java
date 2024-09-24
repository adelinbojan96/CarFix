package bujii.be.service;

import bujii.be.domain.dto.ProductCreateDto;
import bujii.be.domain.dto.ProductViewDto;

public interface ProductService {
    ProductViewDto[] getAllProducts();
    void addProduct(ProductCreateDto product);
}
