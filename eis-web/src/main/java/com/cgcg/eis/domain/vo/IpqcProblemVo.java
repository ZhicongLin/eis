package com.cgcg.eis.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class IpqcProblemVo {
    private Long id;
    private String name;
    private String enName;
    private Integer status;

}
