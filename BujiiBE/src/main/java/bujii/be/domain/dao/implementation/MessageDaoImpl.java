package bujii.be.domain.dao.implementation;

import bujii.be.domain.dao.MessageDao;
import bujii.be.domain.dto.ConversationDto;
import bujii.be.domain.dto.MessageCreateDto;
import bujii.be.domain.dto.MessageViewDto;
import bujii.be.domain.mapper.MessageMapper;
import bujii.be.domain.model.Message;
import bujii.be.domain.model.User;
import bujii.be.repository.MessageRepository;
import bujii.be.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MessageDaoImpl implements MessageDao {

    private final MessageMapper messageMapper;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    @Override
    public void sendMessage(MessageCreateDto messageCreateDto) {
        Message message = messageMapper.toEntity(messageCreateDto);
        User sender = userRepository.findByUsername(messageCreateDto.getSenderUsername())
                .orElseThrow(() -> new EntityNotFoundException("User with username %s doesn't exists".formatted(messageCreateDto.getSenderUsername())));
        User receiver = userRepository.findByUsername(messageCreateDto.getReceiverUsername())
                .orElseThrow(() -> new EntityNotFoundException("User with username %s doesn't exists".formatted(messageCreateDto.getReceiverUsername())));

        message.setIdMessage(getNextId());
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setTime_sent(Timestamp.valueOf(LocalDateTime.now()));

        messageRepository.save(message);
    }

    private Integer getNextId() {
        List<Message> messages = messageRepository.findAll();

        if (messages.isEmpty()) {
            return 1;
        } else {
            return messages.stream()
                    .max(Comparator.comparingInt(Message::getIdMessage))
                    .get()
                    .getIdMessage() + 1;
        }
    }

    @Override
    public MessageViewDto[] getAllMessagesBetweenTwoUsers(ConversationDto conversation) {
        User sender = userRepository.findByUsername(conversation.getSender())
                .orElseThrow(() -> new EntityNotFoundException("User with username %s doesn't exists".formatted(conversation.getSender())));
        User receiver = userRepository.findByUsername(conversation.getReceiver())
                .orElseThrow(() -> new EntityNotFoundException("User with username %s doesn't exists".formatted(conversation.getReceiver())));

        List<Message> messages = messageRepository.findMessagesBetweenUsers(sender.getId(),receiver.getId());

        return messages.stream()
                .map(messageMapper::toViewDto)
                .toArray(MessageViewDto[]::new);
    }
}
