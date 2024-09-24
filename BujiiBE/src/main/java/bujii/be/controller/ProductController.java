package bujii.be.controller;

import bujii.be.domain.dto.ProductCreateDto;
import bujii.be.domain.dto.ProductViewDto;
import bujii.be.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public void addProduct(@ModelAttribute ProductCreateDto productCreateDto) {
        System.out.println(productCreateDto);
        productService.addProduct(productCreateDto);
    }
}
