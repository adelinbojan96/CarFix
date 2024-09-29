package bujii.be.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageCreateDto {
    String senderUsername;
    String receiverUsername;
    String message;
}
