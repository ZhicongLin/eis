package com.cgcg.eis.domain.repository;

import com.cgcg.eis.domain.model.DeviceRecode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface DeviceRecodeRepository extends JpaRepository<DeviceRecode, Long> {

    int countByDeviceId(Long deviceId);

    List<DeviceRecode> findAllByDeviceIdOrderByCreateTimeDesc(Long deviceId);

    List<DeviceRecode> findAllByDeviceIdAndCreateTimeGreaterThanEqualOrderByCreateTimeDesc(Long deviceId, Date date);
}
