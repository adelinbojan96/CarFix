package bujii.be.domain.dao.implementation;

import bujii.be.domain.dao.ProductDao;
import bujii.be.domain.dto.ProductCreateDto;
import bujii.be.domain.dto.ProductViewDto;
import bujii.be.domain.mapper.ProductMapper;
import bujii.be.domain.model.Firm;
import bujii.be.domain.model.Product;
import bujii.be.domain.model.User;
import bujii.be.repository.ProductRepository;
import bujii.be.repository.SellerRepository;
import bujii.be.repository.UserRepository;
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
    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;


    private byte[] loadImageOrDefault(ProductCreateDto productCreateDto) {
        byte[] image;
        if (productCreateDto.getImage() == null) {
            ClassPathResource defaultImageResource = new ClassPathResource("static/no-image.png");
            try {
                image = StreamUtils.copyToByteArray(defaultImageResource.getInputStream());
            } catch (IOException e) {
                throw new RuntimeException("Failed to load default image", e);
            }
        } else {
            try {
                image = productCreateDto.getImage().getBytes();
            } catch (IOException e) {
                throw new RuntimeException("Failed to read image bytes", e);
            }
        }
        return image;
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

        product.setImage(loadImageOrDefault(productCreateDto));

        productRepository.save(product);
    }

    private ProductViewDto[] retrieveProductsByCriteria(List<Product> productList)
    {
        ProductViewDto[] products = new ProductViewDto[productList.size()];

        for (int i = 0; i < productList.size(); i++) {
            Product product = productList.get(i);
            products[i] = productMapper.toViewDto(product);

            int finalI = i;
            sellerRepository.findById(product.getUser_id())
                    .flatMap(seller -> userRepository.findById(seller.getId_user()))
                    .ifPresent(user -> {
                        products[finalI].setSeller_name(user.getUsername());
                        products[finalI].setSeller_picture(user.getPicture());
                    });
        }

        return products;
    }

    @Override
    public ProductViewDto[] getProductsByName(String text) {
        List<Product> productList = productRepository.findByName(text);
        return retrieveProductsByCriteria(productList);
    }
    @Override
    public ProductViewDto[] getProductsByCategory(String text) {
        List<Product> productList = productRepository.findByCategory(text);
        return retrieveProductsByCriteria(productList);
    }
}
