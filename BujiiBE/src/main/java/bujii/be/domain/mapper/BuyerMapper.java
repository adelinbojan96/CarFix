package bujii.be.domain.mapper;

import bujii.be.domain.dto.BuyerCreateDto;
import bujii.be.domain.model.Buyer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BuyerMapper {
    @Mapping(source = "user_id", target = "id_user")
    Buyer toEntity(BuyerCreateDto dto);
}
