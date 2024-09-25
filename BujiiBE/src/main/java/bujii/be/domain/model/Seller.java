package bujii.be.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sellers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seller_seq_gen")
    @SequenceGenerator(name = "seller_seq_gen", sequenceName = "seller_id_seq", allocationSize = 1)
    @Column
    Integer id;
    @Column
    Integer id_user;
}
