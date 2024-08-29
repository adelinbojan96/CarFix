package bujii.be.domain.dao.implementation;

import bujii.be.domain.dao.UserDao;
import bujii.be.domain.dto.UserCreateDto;
import bujii.be.domain.mapper.UserMapper;
import bujii.be.domain.model.User;
import bujii.be.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;

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
        user.setCreated_at(Date.valueOf(LocalDate.now()));

        userRepository.save(user);
    }
}
