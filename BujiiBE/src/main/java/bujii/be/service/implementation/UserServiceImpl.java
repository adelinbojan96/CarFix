package bujii.be.service.implementation;

import bujii.be.Auth.TokenProvider;
import bujii.be.domain.dao.UserDao;
import bujii.be.domain.dto.LoginDto;
import bujii.be.domain.dto.LoginViewDto;
import bujii.be.domain.dto.UserCreateDto;
import bujii.be.domain.model.User;
import bujii.be.exceptions.LoginError;
import bujii.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    @Override
    public LoginViewDto login(LoginDto loginDto) {
        User user = userDao.findByUsername(loginDto.getUsername());

        if(!passwordEncoder.matches(loginDto.getPassword(),user.getPassword())){
            throw new LoginError("Bad credentials");
        }
        try {
            var accessToken = tokenProvider.generateAccessToken(user);
            return new LoginViewDto(accessToken);

        } catch (Exception e) {
            throw new LoginError(e.getMessage());
        }
    }

    @Override
    public void register(UserCreateDto userCreateDto) {
        userCreateDto.setPassword(new BCryptPasswordEncoder().encode(userCreateDto.getPassword()));
        userDao.register(userCreateDto);
    }
    @Override
    public void editProfile(String formerUsername, UserCreateDto userCreateDto) {
        if (userCreateDto.getPassword() != null && !userCreateDto.getPassword().isEmpty())
            userCreateDto.setPassword(new BCryptPasswordEncoder().encode(userCreateDto.getPassword()));
        userDao.editProfile(formerUsername, userCreateDto);
    }
}
