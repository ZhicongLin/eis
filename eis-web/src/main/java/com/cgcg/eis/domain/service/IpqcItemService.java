package com.cgcg.eis.domain.service;

import com.cgcg.eis.domain.model.DeviceRecode;
import com.cgcg.eis.domain.model.IpqcItem;
import com.cgcg.eis.domain.model.IpqcRecode;
import com.cgcg.eis.domain.vo.IpqcListVo;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface IpqcItemService {

    IpqcListVo findList();

    void saveIpqcRecode(List<String> contents, DeviceRecode deviceRecode);

    List<IpqcRecode> findRecodeByDeviceRecodeId(Long deviceRecodeId);

    PageInfo<IpqcItem> findListPage(String keyword, Integer pageNum, Integer pageSize);

    void delete(Long id);

    void save(IpqcItem item);
}
