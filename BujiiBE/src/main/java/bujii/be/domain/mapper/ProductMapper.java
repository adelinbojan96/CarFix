package bujii.be.domain.mapper;

import bujii.be.domain.dto.ProductViewDto;
import bujii.be.domain.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
    @Mapping(target = "seller_name", ignore = true)
    @Mapping(target = "seller_picture", ignore = true)
    ProductViewDto toViewDto(Product product);
    ProductViewDto[] toListViewDto(Product[] products);
}
