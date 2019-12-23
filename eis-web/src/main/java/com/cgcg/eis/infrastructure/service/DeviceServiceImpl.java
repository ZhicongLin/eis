package com.cgcg.eis.infrastructure.service;

import com.cgcg.eis.domain.mapper.DeviceMapper;
import com.cgcg.eis.domain.model.Device;
import com.cgcg.eis.domain.model.DeviceRecode;
import com.cgcg.eis.domain.model.IpqcRecode;
import com.cgcg.eis.domain.model.IpqcUser;
import com.cgcg.eis.domain.repository.DeviceInfoRepository;
import com.cgcg.eis.domain.repository.DeviceRecodeRepository;
import com.cgcg.eis.domain.repository.DeviceRepository;
import com.cgcg.eis.domain.service.DeviceService;
import com.cgcg.eis.domain.service.IpqcItemService;
import com.cgcg.eis.domain.service.IpqcUserService;
import com.cgcg.eis.domain.vo.DeviceRecodeCheckVo;
import com.cgcg.eis.domain.vo.DeviceRecodeVo;
import com.cgcg.eis.domain.vo.IpqcListVo;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DeviceServiceImpl implements DeviceService {
    @Resource
    private DeviceRepository deviceRepository;
    @Resource
    private DeviceMapper deviceMapper;
    @Resource
    private IpqcUserService ipqcUserService;
    @Resource
    private IpqcItemService ipqcItemService;
    @Resource
    private DeviceInfoRepository deviceInfoRepository;
    @Resource
    private DeviceRecodeRepository deviceRecodeRepository;

    @Override
    public Device findByQrCode(String code) {
        final Device device = this.deviceRepository.findFirstByQrCodeNo(code);
        if (device == null) {
            return this.createDevice(code);
        }
        return device;
    }

    @Override
    public Device findById(Long id) {
        final Optional<Device> optional = this.deviceRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public Device createDevice(String code) {
        final Device device = new Device();
        device.setQrCodeNo(code);
        device.setCreateTime(new Date());
        device.setDeviceInfo(this.deviceInfoRepository.getOne(1L));
        this.deviceRepository.save(device);
        return device;
    }

    @Override
    public Device saveRecode(DeviceRecodeCheckVo recode, String path) {
        final Device device = this.findById(recode.getId());
        final IpqcUser ipqcUser = this.ipqcUserService.find(recode.getIpqcPhone(), recode.getIpqcName());
        final List<String> contents = recode.getContent();
        if (device == null || ipqcUser == null || contents == null || ipqcUser.getStatus() == 0) {
            return null;
        }
        device.setIpqcUser(ipqcUser);
        device.setIpqcTime(new Date());
        final DeviceRecode deviceRecode = new DeviceRecode();
        deviceRecode.setArea(recode.getIpqcAddr());
        deviceRecode.setCreateTime(new Date());
        deviceRecode.setDeviceId(device.getId());
        deviceRecode.setQrCodeNo(device.getQrCodeNo());
        deviceRecode.setIpqcResult(recode.getResult());
        deviceRecode.setIpqcUser(ipqcUser);
        deviceRecode.setIpqcTime(new Date());
        deviceRecode.setRemark(recode.getRemarkDesc());
        deviceRecode.setModifyDesc(recode.getModifyDesc());
        deviceRecode.setImageUri(path);
        deviceRecodeRepository.save(deviceRecode);
        this.ipqcItemService.saveIpqcRecode(contents, deviceRecode);
        return device;
    }

    @Override
    public List<DeviceRecodeVo> findAllRecode(Long deviceId, Long time) {
        final Device device = this.findById(deviceId);
        List<DeviceRecode> recodes;
        if (time == null || time == 0) {
            recodes = this.deviceRecodeRepository.findAllByDeviceIdOrderByCreateTimeDesc(deviceId);
        } else {
            recodes = this.deviceRecodeRepository.findAllByDeviceIdAndCreateTimeGreaterThanEqualOrderByCreateTimeDesc(deviceId, new Date(time));
        }
        final IpqcListVo list = ipqcItemService.findList();
        List<DeviceRecodeVo> recodeVos = new ArrayList<>();
        for (DeviceRecode recode : recodes) {
            List<IpqcRecode> ipqcRecodes = this.ipqcItemService.findRecodeByDeviceRecodeId(recode.getId());
            if (ipqcRecodes == null || ipqcRecodes.isEmpty()) {
                continue;
            }
            final DeviceRecodeVo deviceRecodeVo = new DeviceRecodeVo(device, recode);
            deviceRecodeVo.setRecodeList(ipqcRecodes, list.getIpqcItems(), list.getIpqcProblems());
            recodeVos.add(deviceRecodeVo);
        }
        return recodeVos;
    }

    @Override
    public int recodeCount(Long deviceId) {
        return this.deviceRecodeRepository.countByDeviceId(deviceId);
    }

    @Override
    public void modifyCode(Long deviceId, String code) {
        final Device device = this.findById(deviceId);
        device.setDeviceCode(code);
        this.deviceRepository.save(device);
    }

    @Override
    public void modifyAddr(Long deviceId, String addr) {
        final Device device = this.findById(deviceId);
        device.setAddress(addr);
        this.deviceRepository.save(device);
    }

    @Override
    public PageInfo<Device> findList(String keyword, int pageSize, int pageNum) {
        PageHelper.startPage(pageNum, pageSize);
        final Page<Device> page = this.deviceMapper.findByAddress(keyword);
        return page != null ? page.toPageInfo() : new PageInfo<>();
    }

}
