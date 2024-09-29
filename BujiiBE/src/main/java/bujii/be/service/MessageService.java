package bujii.be.service;

import bujii.be.domain.dto.ConversationDto;
import bujii.be.domain.dto.MessageCreateDto;
import bujii.be.domain.dto.MessageViewDto;

public interface MessageService {
    void sendMessage(MessageCreateDto messageCreateDto);
    MessageViewDto[] getMessagesBetweenTwoUsers(ConversationDto conversationDto);
}
