package bujii.be.domain.dao.implementation;

import bujii.be.domain.dao.ProductDao;
import bujii.be.domain.dto.ProductCreateDto;
import bujii.be.domain.dto.ProductViewDto;
import bujii.be.domain.mapper.ProductMapper;
import bujii.be.domain.model.Firm;
import bujii.be.domain.model.Product;
import bujii.be.domain.model.User;
import bujii.be.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.sql.Timestamp;
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
        for (Product product :
                productList) {
            products[i] = productMapper.toViewDto(product);
            i++;
        }
        return products;
    }

    @Override
    public void addProduct(User user, Firm firm, ProductCreateDto productCreateDto) {
        int id_user = user.getId();
        int id_firm = firm.getId();

        Product product = new Product();
        product.setTitle(productCreateDto.getTitle());
        product.setDescription(productCreateDto.getDescription());
        product.setPrice(productCreateDto.getPrice());
        product.setQuantity(productCreateDto.getQuantity());
        product.setCreated_at(new Timestamp(System.currentTimeMillis()));
        product.setUser_id(id_user);
        product.setFirm_id(id_firm);

        if (productCreateDto.getImage() == null) {
            byte[] image;
            ClassPathResource defaultImageResource = new ClassPathResource("static/no-image.png");
            try {
                image = StreamUtils.copyToByteArray(defaultImageResource.getInputStream());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            product.setImage(image);
        } else {
            byte[] image;
            try {
                image = productCreateDto.getImage().getBytes();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            product.setImage(image);
        }
        productRepository.save(product);
    }
}
