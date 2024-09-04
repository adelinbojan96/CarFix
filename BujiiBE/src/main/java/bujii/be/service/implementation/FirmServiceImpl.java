package bujii.be.service.implementation;

import bujii.be.domain.dao.FirmDao;
import bujii.be.domain.dto.FirmViewDto;
import bujii.be.service.FirmService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FirmServiceImpl implements FirmService {
    private final FirmDao firmDao;
    @Override
    public FirmViewDto[] getAllFirms() {
        return firmDao.getAllFirms();
    }
}
