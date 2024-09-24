package bujii.be.service;

import bujii.be.domain.dto.FirmViewDto;
import bujii.be.domain.dto.ProductViewDto;

public interface ProductService {
    ProductViewDto[] getAllProducts();
}
