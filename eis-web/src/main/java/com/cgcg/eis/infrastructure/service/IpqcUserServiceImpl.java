package com.cgcg.eis.infrastructure.service;

import com.cgcg.eis.domain.model.IpqcUser;
import com.cgcg.eis.domain.repository.IpqcUserRepository;
import com.cgcg.eis.domain.service.IpqcUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
@Transactional
public class IpqcUserServiceImpl implements IpqcUserService {
    @Resource
    IpqcUserRepository ipqcUserRepository;
    @Override
    public IpqcUser find(String phone, String name) {
        return this.ipqcUserRepository.findFirstByPhoneAndIpqcName(phone, name);
    }
}
