package bujii.be.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.type.descriptor.java.BlobJavaType;

import java.sql.Blob;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
    @SequenceGenerator(name = "user_seq_gen", sequenceName = "user_id_seq", allocationSize = 1)
    @Column
    Integer id;

    @Column
    String username;

    @Column
    String password;

    @Column
    String email;

    @Column
    String role;

    @Column
    Timestamp created_at;

    @Column
    byte[] picture;
}
