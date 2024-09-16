package bujii.be.domain.mapper;

import bujii.be.domain.dto.FirmViewDto;
import bujii.be.domain.model.Firm;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FirmMapper {
    public FirmViewDto toViewDto(Firm firm);
    public FirmViewDto[] toListViewDto(Firm[] firms);
}
