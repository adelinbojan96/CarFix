package bujii.be.domain.mapper;

import bujii.be.domain.dto.ProductViewDto;
import bujii.be.domain.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
    public ProductViewDto toViewDto(Product product);
    public ProductViewDto[] toListViewDto(Product[] products);
}
