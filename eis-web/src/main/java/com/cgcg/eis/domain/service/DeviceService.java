package com.cgcg.eis.domain.service;

import com.cgcg.eis.domain.model.Device;
import com.cgcg.eis.domain.vo.DeviceRecodeCheckVo;
import com.cgcg.eis.domain.vo.DeviceRecodeVo;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface DeviceService {

    Device findByQrCode(String code);

    Device findById(Long id);

    Device createDevice(String code);

    Device saveRecode(DeviceRecodeCheckVo recode, String path);

    List<DeviceRecodeVo> findAllRecode(Long deviceId, Long time);

    int recodeCount(Long deviceId);

    void modifyCode(Long deviceId, String code);

    void modifyAddr(Long deviceId, String addr);

    PageInfo<Device> findList(String keyword, int pageSize, int pageNum);
}
