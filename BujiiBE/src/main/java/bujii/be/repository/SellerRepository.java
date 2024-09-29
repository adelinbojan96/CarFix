package bujii.be.repository;

import bujii.be.domain.model.Buyer;
import bujii.be.domain.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Integer> {
    @Query("SELECT s FROM Seller s WHERE s.id_user = :id_user")
    public Seller searchById(@Param("id_user") Integer id_user);
}
