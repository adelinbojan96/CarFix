package bujii.be.repository;

import bujii.be.domain.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p WHERE p.title LIKE %:name%")
    public List<Product> findByName(String name);
    @Query("SELECT p FROM Product p JOIN Firm f ON p.firm_id = f.id WHERE f.name = :name")
    public List<Product> findByCategory(String name);
}
