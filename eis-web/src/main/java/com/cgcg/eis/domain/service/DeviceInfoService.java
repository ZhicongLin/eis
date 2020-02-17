package com.cgcg.eis.domain.service;

import com.cgcg.eis.domain.model.DeviceInfo;
import com.github.pagehelper.PageInfo;

public interface DeviceInfoService {
    PageInfo<DeviceInfo> findList(String keyword, int pageSize, int pageNum);

    void save(DeviceInfo deviceInfo);

    DeviceInfo findById(long id);
}
