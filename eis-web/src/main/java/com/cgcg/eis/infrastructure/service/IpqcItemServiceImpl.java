package com.cgcg.eis.infrastructure.service;

import com.cgcg.eis.domain.mapper.IpqcItemMapper;
import com.cgcg.eis.domain.model.*;
import com.cgcg.eis.domain.repository.IpqcItemRepository;
import com.cgcg.eis.domain.repository.IpqcProblemRepository;
import com.cgcg.eis.domain.repository.IpqcRecodeRepository;
import com.cgcg.eis.domain.service.IpqcItemService;
import com.cgcg.eis.domain.vo.IpqcListVo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class IpqcItemServiceImpl implements IpqcItemService {
    @Resource
    IpqcProblemRepository ipqcProblemRepository;
    @Resource
    IpqcItemRepository ipqcItemRepository;
    @Resource
    IpqcItemMapper ipqcItemMapper;
    @Resource
    IpqcRecodeRepository ipqcRecodeRepository;
    @Override
    public IpqcListVo findList() {
        final List<IpqcProblem> problems = this.ipqcProblemRepository.findAll();
        final List<IpqcItem> ipqcItems = this.ipqcItemRepository.findAll();
        List<IpqcItem> ipqcItemList = new ArrayList<>();
        for (IpqcItem ipqcItem : ipqcItems) {
            final Integer eff = ipqcItem.getEff();
            if (eff == 0) {
                ipqcItemList.add(ipqcItem);
            }
        }
        return new IpqcListVo(ipqcItemList, problems);
    }

    @Override
    public void saveIpqcRecode(List<String> contents, DeviceRecode deviceRecode) {
        final List<IpqcRecode> recodes = new ArrayList<>();
        for (String content : contents) {
            final String[] ids = content.split("::");
            IpqcRecode ipqcRecode = new IpqcRecode();
            ipqcRecode.setDeviceId(deviceRecode.getDeviceId());
            ipqcRecode.setDeviceRecordId(deviceRecode.getId());
            ipqcRecode.setCreateTime(new Date());
            if (ids.length == 2) {
                ipqcRecode.setItemId(Long.valueOf(ids[0]));
                ipqcRecode.setStatus(Integer.valueOf(ids[1]));
                recodes.add(ipqcRecode);
            } else if (ids.length == 3) {
                ipqcRecode.setItemId(Long.valueOf(ids[0]));
                ipqcRecode.setProblemId(Long.valueOf(ids[1]));
                ipqcRecode.setStatus(Integer.valueOf(ids[2]));
                recodes.add(ipqcRecode);
            }
        }
        if (!recodes.isEmpty()) {
            this.ipqcRecodeRepository.saveAll(recodes);
        }
    }

    @Override
    public List<IpqcRecode> findRecodeByDeviceRecodeId(Long deviceRecodeId) {
        return this.ipqcRecodeRepository.findByDeviceRecordId(deviceRecodeId);
    }

    @Override
    public PageInfo<IpqcItem> findListPage(String keyword, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        return this.ipqcItemMapper.findByName(keyword).toPageInfo();
    }

    @Override
    public void delete(Long id) {
        final Optional<IpqcItem> optional = this.ipqcItemRepository.findById(id);
        if (optional.isPresent()) {
            IpqcItem ipqcItem = optional.get();
            ipqcItem.setEff(1);
            ipqcItem.setUpdateTime(new Date());
            this.ipqcItemRepository.save(ipqcItem);
        }
    }

    @Override
    public void save(IpqcItem item) {
        if (item.getId() != null && item.getId() != 0) {
            final Optional<IpqcItem> ipqcItem = this.ipqcItemRepository.findById(item.getId());
            if (ipqcItem.isPresent()) {
                final IpqcItem it = ipqcItem.get();
                it.setEnName(item.getEnName());
                it.setName(item.getName());
                it.setRemark(item.getRemark());
                it.setType(item.getType());
                it.setUpdateTime(new Date());
                this.ipqcItemRepository.save(it);
            }
        } else {
            item.setCreateTime(new Date());
            this.ipqcItemRepository.save(item);
        }
    }
}
