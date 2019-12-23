package com.cgcg.eis.domain.repository;

import com.cgcg.eis.domain.model.IpqcUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IpqcUserRepository extends JpaRepository<IpqcUser, Long> {

    IpqcUser findFirstByPhoneAndIpqcName(String phone, String name);
}
