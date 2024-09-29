package bujii.be.domain.dao;

import bujii.be.domain.dto.ConversationDto;
import bujii.be.domain.dto.MessageCreateDto;
import bujii.be.domain.dto.MessageViewDto;

public interface MessageDao {
    void sendMessage(MessageCreateDto messageCreateDto);
    MessageViewDto[] getAllMessagesBetweenTwoUsers(ConversationDto conversation);
}
