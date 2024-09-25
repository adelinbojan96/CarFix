package bujii.be.domain.dao;

import bujii.be.domain.dto.ProductCreateDto;
import bujii.be.domain.dto.ProductViewDto;
import bujii.be.domain.model.Firm;
import bujii.be.domain.model.User;

public interface ProductDao {
    ProductViewDto[] getAllProducts();
    void addProduct(User user, Firm firm, ProductCreateDto product);
}
