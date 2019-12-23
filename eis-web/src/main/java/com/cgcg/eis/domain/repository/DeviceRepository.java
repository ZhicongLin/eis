package com.cgcg.eis.domain.repository;

import com.cgcg.eis.domain.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {

    Device findFirstByQrCodeNo(String code);
}
