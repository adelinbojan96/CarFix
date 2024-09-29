package bujii.be.domain.mapper;

import bujii.be.domain.dto.UserCreateDto;
import bujii.be.domain.dto.UserViewDto;
import bujii.be.domain.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    User toEntity(UserCreateDto userCreateDto);
    @Mapping(source = "username", target = "name")
    @Mapping(source = "picture", target = "avatar")
    UserViewDto toUserViewDto(User user);

}
