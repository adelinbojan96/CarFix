package bujii.be.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.type.descriptor.java.BlobJavaType;

import java.sql.Blob;
import java.sql.Date;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    Date created_at;

    @Column
    BlobJavaType picture;
}
