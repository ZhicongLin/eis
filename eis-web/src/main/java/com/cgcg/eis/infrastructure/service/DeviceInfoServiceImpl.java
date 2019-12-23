package com.cgcg.eis.infrastructure.service;

import com.cgcg.eis.domain.model.DeviceInfo;
import com.cgcg.eis.domain.repository.DeviceInfoRepository;
import com.cgcg.eis.domain.service.DeviceInfoService;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class DeviceInfoServiceImpl implements DeviceInfoService {
    @Resource
    private DeviceInfoRepository deviceInfoRepository;

    @Override
    public PageInfo<DeviceInfo> findList(String keyword, int pageSize, int pageNum) {
        final PageInfo<DeviceInfo> devicePageInfo = new PageInfo<>();
        final List<DeviceInfo> list = this.deviceInfoRepository.findAll();
        devicePageInfo.setList(list);
        devicePageInfo.setTotal(list.size());
        devicePageInfo.setHasNextPage(false);
        devicePageInfo.setHasPreviousPage(false);
        devicePageInfo.setPageNum(1);
        devicePageInfo.setPages(1);
        devicePageInfo.setPageSize(list.size());
        return devicePageInfo;
    }

    @Override
    public void save(DeviceInfo deviceInfo) {
        this.deviceInfoRepository.save(deviceInfo);
    }
}
