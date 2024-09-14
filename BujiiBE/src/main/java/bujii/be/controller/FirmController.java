package bujii.be.controller;

import bujii.be.domain.dto.FirmViewDto;
import bujii.be.service.FirmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class FirmController {
    private final FirmService firmService;

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public FirmViewDto[] getAllFirms(){
        return firmService.getAllFirms();
    }
}
