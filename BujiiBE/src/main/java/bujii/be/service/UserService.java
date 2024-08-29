package bujii.be.service;

import bujii.be.domain.dto.LoginDto;
import bujii.be.domain.dto.LoginViewDto;
import bujii.be.domain.dto.UserCreateDto;

public interface UserService {
    LoginViewDto login(LoginDto loginDto);

    void register(UserCreateDto userCreateDto);
}
