package com.cgcg.eis.domain.repository;

import com.cgcg.eis.domain.model.IpqcRecode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IpqcRecodeRepository extends JpaRepository<IpqcRecode, Long> {
    List<IpqcRecode> findByDeviceRecordId(Long deviceRecodeId);
}
