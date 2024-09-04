package bujii.be.service;

import bujii.be.domain.dto.FirmViewDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

public interface FirmService {
    FirmViewDto[] getAllFirms();
}
