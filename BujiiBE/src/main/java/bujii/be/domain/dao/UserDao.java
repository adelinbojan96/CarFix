package bujii.be.domain.dao;

import bujii.be.domain.dto.UserCreateDto;
import bujii.be.domain.dto.UserViewDto;
import bujii.be.domain.model.User;

public interface UserDao {
    User findByUsername(String username);

    void register(UserCreateDto userCreateDto);

    void editProfile(String formerUsername, UserCreateDto userCreateDto);

    void saveProfileImage(User user, byte[] image);

    void becomeSeller(User user);

    UserViewDto[] getAllUsersExceptMe(String username);
}
