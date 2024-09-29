package bujii.be.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageViewDto {
    Integer id;
    String sender;
    String text;
    String time;
    byte[] senderAvatar;
}
