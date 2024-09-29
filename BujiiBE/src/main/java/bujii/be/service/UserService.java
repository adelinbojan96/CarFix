package bujii.be.service;

import bujii.be.domain.dto.LoginDto;
import bujii.be.domain.dto.LoginViewDto;
import bujii.be.domain.dto.UserCreateDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import bujii.be.domain.dto.UserViewDto;

public interface UserService {
    LoginViewDto login(LoginDto loginDto);

    void register(UserCreateDto userCreateDto);

    void editProfile(String formerUsername, UserCreateDto userCreateDto);

    void saveProfileImage(String username, MultipartFile file) throws IOException;

    byte[] loadImageFromDatabase(String username);

    void setUserAsSeller(String username);

    public UserViewDto[] getAllUsersExceptMe(String username);
}
