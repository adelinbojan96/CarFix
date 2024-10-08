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
