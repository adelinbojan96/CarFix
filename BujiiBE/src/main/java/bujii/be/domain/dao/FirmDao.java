package bujii.be.domain.dao;

import bujii.be.domain.dto.FirmViewDto;
import bujii.be.domain.model.Firm;

public interface FirmDao {
    FirmViewDto[] getAllFirms();
    Firm getFirmByName(String firmName);
}
