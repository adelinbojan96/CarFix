package bujii.be.controller;

import bujii.be.domain.dto.ProductViewDto;
import bujii.be.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public ProductViewDto[] getAllProducts(){
        return productService.getAllProducts();
    }
}
