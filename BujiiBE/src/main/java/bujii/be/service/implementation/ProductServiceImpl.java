package bujii.be.service.implementation;

import bujii.be.domain.dao.FirmDao;
import bujii.be.domain.dao.ProductDao;
import bujii.be.domain.dao.UserDao;
import bujii.be.domain.dto.ProductCreateDto;
import bujii.be.domain.dto.ProductViewDto;
import bujii.be.domain.model.Firm;
import bujii.be.domain.model.User;
import bujii.be.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductDao productDao;
    private final UserDao userDao;
    private final FirmDao firmDao;


    @Override
    public void addProduct(ProductCreateDto productCreateDto) {
        User user =  userDao.findByUsername(productCreateDto.getUsername());
        Firm firm = firmDao.getFirmByName(productCreateDto.getFirm());
        productDao.addProduct(user, firm, productCreateDto);
    }

    @Override
    public ProductViewDto[] retrieveByName(String text) {

        return productDao.getProductsByName(text);
    }

    @Override
    public ProductViewDto[] retrieveByCategory(String text) {
        return productDao.getProductsByCategory(text);
    }
}
