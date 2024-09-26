package bujii.be.controller;

import bujii.be.domain.dto.ProductCreateDto;
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

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public void addProduct(@ModelAttribute ProductCreateDto productCreateDto) {
        System.out.println(productCreateDto);
        productService.addProduct(productCreateDto);
    }
    @GetMapping("/retrieveName")
    @ResponseStatus(HttpStatus.OK)
    public ProductViewDto[] getProductsByName(@RequestParam String text) {
        System.out.println(text);
        return productService.retrieveByName(text);
    }
    @GetMapping("/retrieveCategory")
    @ResponseStatus(HttpStatus.OK)
    public ProductViewDto[] getProductsByCategory(@RequestParam String text) {
        System.out.println(text);
        return productService.retrieveByCategory(text);
    }
}
