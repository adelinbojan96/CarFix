package bujii.be.domain.dao.implementation;

import bujii.be.domain.dao.UserDao;
import bujii.be.domain.dto.UserCreateDto;
import bujii.be.domain.mapper.UserMapper;
import bujii.be.domain.model.User;
import bujii.be.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.Instant;

@Component
@RequiredArgsConstructor
public class UserDaoImpl implements UserDao {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

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
        
        userRepository.save(user);
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
    public void saveUser(User user) {
        userRepository.save(user);
    }
}
