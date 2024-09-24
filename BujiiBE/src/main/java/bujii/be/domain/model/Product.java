package bujii.be.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.Timestamp;

@Entity
@Table(name = "product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_seq_gen")
//    @SequenceGenerator(name = "product_seq_gen", sequenceName = "product_id_seq", allocationSize = 1)
    @Column
    Integer id;

    @Column
    String title;

    @Column
    String description;

    @Column
    Integer user_id;

    @Column
    Float price;

    @Column
    Integer quantity;

    @Column
    Timestamp created_at;

    @Column
    Integer firm_id;

    @Column
    byte[] image;
}
