package bujii.be.domain.dao.implementation;

import bujii.be.domain.dao.ProductDao;
import bujii.be.domain.dto.ProductViewDto;
import bujii.be.domain.mapper.ProductMapper;
import bujii.be.domain.model.Product;
import bujii.be.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductDaoImpl implements ProductDao {
    private final ProductMapper productMapper;
    private final ProductRepository productRepository;
    @Override
    public ProductViewDto[] getAllProducts() {
        List<Product> productList = productRepository.findAll();
        ProductViewDto[] products = new ProductViewDto[productList.size()];
        int i = 0;
        for (Product product:
                productList) {
            products[i] = productMapper.toViewDto(product);
            i++;
        }
        return products;
    }
}
