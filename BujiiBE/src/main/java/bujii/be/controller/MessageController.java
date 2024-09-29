package bujii.be.controller;

import bujii.be.domain.dto.ConversationDto;
import bujii.be.domain.dto.MessageCreateDto;
import bujii.be.domain.dto.MessageViewDto;
import bujii.be.service.MessageService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @PostMapping("")
    public void sendMessage(@RequestBody MessageCreateDto messageCreateDto){
        messageService.sendMessage(messageCreateDto);
    }

    @GetMapping("/conversation")
    public MessageViewDto[] getConversation(@RequestParam String sender, @RequestParam String receiver) {
        ConversationDto conversation = new ConversationDto();
        conversation.setReceiver(receiver);
        conversation.setSender(sender);

        return messageService.getMessagesBetweenTwoUsers(conversation);
    }
}
