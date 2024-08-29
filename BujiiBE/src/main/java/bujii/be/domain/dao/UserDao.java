package bujii.be.domain.dao;

import bujii.be.domain.dto.UserCreateDto;
import bujii.be.domain.model.User;

public interface UserDao {
    User findByUsername(String username);

    void register(UserCreateDto userCreateDto);
}
