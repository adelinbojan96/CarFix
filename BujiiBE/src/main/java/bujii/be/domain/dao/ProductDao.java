package bujii.be.domain.dao;

import bujii.be.domain.dto.FirmViewDto;
import bujii.be.domain.dto.ProductViewDto;

public interface ProductDao {
    ProductViewDto[] getAllProducts();
}
