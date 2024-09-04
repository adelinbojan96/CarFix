package bujii.be.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "firm")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Firm {
    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
//    @SequenceGenerator(name = "user_seq_gen", sequenceName = "user_id_seq", allocationSize = 1)
    @Column
    Integer id;

    @Column
    String name;

    @Column
    String description;

    @Column
    Integer createdAt;

    @Column
    byte[] image;
}
