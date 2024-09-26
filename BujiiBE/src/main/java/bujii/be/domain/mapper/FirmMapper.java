package bujii.be.domain.mapper;

import bujii.be.domain.dto.FirmViewDto;
import bujii.be.domain.model.Firm;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FirmMapper {
    FirmViewDto toViewDto(Firm firm);
    FirmViewDto[] toListViewDto(Firm[] firms);
}
