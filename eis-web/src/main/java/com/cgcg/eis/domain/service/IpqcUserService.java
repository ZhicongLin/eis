package com.cgcg.eis.domain.service;

import com.cgcg.eis.domain.model.IpqcUser;

public interface IpqcUserService {

    IpqcUser find(String phone, String name);
}
