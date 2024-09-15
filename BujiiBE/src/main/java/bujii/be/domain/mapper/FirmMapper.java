package bujii.be.domain.mapper;

import bujii.be.domain.dto.FirmViewDto;
import bujii.be.domain.model.Firm;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FirmMapper {
    FirmViewDto toViewDto(Firm firm);
    FirmViewDto[] toListViewDto(Firm[] firms);
}

