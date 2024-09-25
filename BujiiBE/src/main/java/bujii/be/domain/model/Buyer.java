package bujii.be.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "buyers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Buyer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "buyer_seq_gen")
    @SequenceGenerator(name = "buyer_seq_gen", sequenceName = "buyer_id_seq", allocationSize = 1)
    @Column
    Integer id;
    @Column
    Integer id_user;
}
