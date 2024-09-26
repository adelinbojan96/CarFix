package bujii.be.domain.dao.implementation;

import bujii.be.domain.dao.UserDao;
import bujii.be.domain.dto.BuyerCreateDto;
import bujii.be.domain.dto.SellerCreateDto;
import bujii.be.domain.dto.UserCreateDto;
import bujii.be.domain.mapper.BuyerMapper;
import bujii.be.domain.mapper.SellerMapper;
import bujii.be.domain.mapper.UserMapper;
import bujii.be.domain.model.Buyer;
import bujii.be.domain.model.Seller;
import bujii.be.domain.model.User;
import bujii.be.repository.BuyerRepository;
import bujii.be.repository.SellerRepository;
import bujii.be.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;

@Component
@RequiredArgsConstructor
public class UserDaoImpl implements UserDao {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BuyerRepository buyerRepository;
    private final BuyerMapper buyerMapper;
    private final SellerRepository sellerRepository;
    private final SellerMapper sellerMapper;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User with username %s doesn't exists".formatted(username)));
    }
    @Override
    public void register(UserCreateDto userCreateDto) {
        User user = userMapper.toEntity(userCreateDto);
        user.setRole("Buyer");
        user.setCreated_at(Timestamp.from(Instant.now()));

        byte[] image;
        ClassPathResource defaultImageResource = new ClassPathResource("static/no-image.png");
        try {
            image = StreamUtils.copyToByteArray(defaultImageResource.getInputStream());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        user.setPicture(image);

        userRepository.save(user);

        BuyerCreateDto buyerCreateDto = new BuyerCreateDto();
        buyerCreateDto.setUser_id(user.getId());

        Buyer buyer = buyerMapper.toEntity(buyerCreateDto);
        buyerRepository.save(buyer);
    }


    @Override
    public void editProfile(String formerUsername, UserCreateDto userCreateDto) {
        User existingUser = userRepository.findByUsername(formerUsername)
                .orElseThrow(() -> new EntityNotFoundException("User with username %s doesn't exist".formatted(userCreateDto.getUsername())));

        existingUser.setUsername(userCreateDto.getUsername());
        existingUser.setPassword(userCreateDto.getPassword());
        existingUser.setEmail(userCreateDto.getEmail());
        userRepository.save(existingUser);
    }

    @Override
    public void saveProfileImage(User user, byte[] image) {
        user.setPicture(image);
        userRepository.save(user);
    }

    @Override
    public void becomeSeller(User user) {

        SellerCreateDto sellerCreateDto = new SellerCreateDto();
        sellerCreateDto.setUser_id(user.getId());

        //delete from Buyer repository and update it on sellers'
        Buyer buyer = buyerRepository.searchById(user.getId());
        if(buyer != null) {
            buyerRepository.delete(buyer);
        }

        Seller seller = sellerMapper.toEntity(sellerCreateDto);
        user.setRole("Seller");

        sellerRepository.save(seller);
        userRepository.save(user);
    }
}
