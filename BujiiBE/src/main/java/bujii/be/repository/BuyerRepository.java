package bujii.be.repository;

import bujii.be.domain.model.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, Integer> {
    @Query("SELECT b FROM Buyer b WHERE b.id_user = :id_user")
    public Buyer searchById(@Param("id_user") Integer id_user);
}
