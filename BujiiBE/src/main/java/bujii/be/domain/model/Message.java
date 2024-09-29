package bujii.be.domain.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "messages")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
//    @SequenceGenerator(name = "user_seq_gen", sequenceName = "user_id_seq", allocationSize = 1)
    @Column
    Integer idMessage;

    @Column
    String message;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    User sender;


    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    User receiver;

    @Column
    Timestamp time_sent;
}

