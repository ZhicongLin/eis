package com.cgcg.eis.domain.vo;

import com.cgcg.eis.domain.model.IpqcItem;
import lombok.Data;

import java.util.List;

@Data
public class IpqcRecodeItemVo {

    private Integer status;

    private IpqcItem ipqcItem;

    private List<IpqcProblemVo> problems;

    public IpqcRecodeItemVo(IpqcItem ipqcItem) {
        this.ipqcItem = ipqcItem;
    }
}
