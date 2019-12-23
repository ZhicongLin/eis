package com.cgcg.eis.domain.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class DeviceRecodeCheckVo {

    private Long id;
    private Integer result;
    private List<String> content;
    private String remarkDesc;
    private String modifyDesc;
    private String ipqcName;
    private String ipqcPhone;
    private String ipqcAddr;
}
