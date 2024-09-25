package bujii.be.domain.mapper;

import bujii.be.domain.dto.SellerCreateDto;
import bujii.be.domain.model.Seller;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SellerMapper {
    @Mapping(source = "user_id", target = "id_user")
    Seller toEntity(SellerCreateDto dto);
}
