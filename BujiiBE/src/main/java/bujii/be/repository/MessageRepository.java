package bujii.be.repository;

import bujii.be.domain.model.Firm;
import bujii.be.domain.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query(value = "select * from messages where sender_id=?1 and receiver_id=?2 or sender_id=?2 and receiver_id=?1",nativeQuery = true)
    List<Message> findMessagesBetweenUsers(Integer senderId, Integer receiverId);

    @Query(value = "select count(*) from messages where sender_id=?1 or receiver_id=?1",nativeQuery = true)
    Integer numberOfMessages(Integer user_id);
}
