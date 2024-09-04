package bujii.be.domain.dao.implementation;

import bujii.be.domain.dao.FirmDao;
import bujii.be.domain.dto.FirmViewDto;
import bujii.be.domain.mapper.FirmMapper;
import bujii.be.domain.model.Firm;
import bujii.be.repository.FirmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FirmDaoImpl implements FirmDao {
    private final FirmMapper firmMapper;
    private final FirmRepository firmRepository;
    @Override
    public FirmViewDto[] getAllFirms() {
        List<Firm> firmList = firmRepository.findAll();
        FirmViewDto[] firms = new FirmViewDto[firmList.size()];
        int i = 0;
        for (Firm firm:
             firmList) {
            firms[i] = firmMapper.toViewDto(firm);
            i++;
        }
        return firms;
    }
}
/**
 *----
 * Facultate + nota
 * 3 puncte forte
 * 1 bug/problema pe care am avut-o + cum i-am fata
 * ultima carte citita in domeniu - Ursul pacalit de vulpe
 * -----
 * Authentication vs Authorization
 * Java data structure: List, Queueu, Stack, Map ( + ceva caracteristic lor )
 * Array n elemente, cum gasesti duplicatul => map(key = valoarea, value = frecventa )
 * Ce e o tranzactie in baza de date => una sau mai multe actiuni care se intampla "deodata"
 * Care sunt proprietati ale unei tranzactii => Atomicitate Consistenta Independenta Durabilitate
 * SOLID
 * L din SOLID
 */
