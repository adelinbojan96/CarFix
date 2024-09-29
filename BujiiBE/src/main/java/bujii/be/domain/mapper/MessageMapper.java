package bujii.be.domain.mapper;

import bujii.be.domain.dto.MessageCreateDto;
import bujii.be.domain.dto.MessageViewDto;
import bujii.be.domain.model.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MessageMapper {

    Message toEntity(MessageCreateDto messageCreateDto);

    @Mapping(source = "idMessage", target = "id")
    @Mapping(source = "message", target = "text")
    @Mapping(source = "sender.username",target = "sender")
    @Mapping(source = "time_sent",target = "time")
    @Mapping(source = "sender.picture",target = "senderAvatar")
    MessageViewDto toViewDto(Message message);
}
