package bujii.be.service.implementation;

import bujii.be.domain.dao.ProductDao;
import bujii.be.domain.dto.ProductViewDto;
import bujii.be.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductDao productDao;
    @Override
    public ProductViewDto[] getAllProducts() {
        return productDao.getAllProducts();
    }
}
