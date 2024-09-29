package bujii.be.service.implementation;

import bujii.be.domain.dao.MessageDao;
import bujii.be.domain.dto.ConversationDto;
import bujii.be.domain.dto.MessageCreateDto;
import bujii.be.domain.dto.MessageViewDto;
import bujii.be.service.MessageService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageDao messageDao;

    @Override
    public void sendMessage(MessageCreateDto messageCreateDto) {
        messageDao.sendMessage(messageCreateDto);
    }

    @Override
    public MessageViewDto[] getMessagesBetweenTwoUsers(ConversationDto conversationDto) {
        return messageDao.getAllMessagesBetweenTwoUsers(conversationDto);
    }
}
