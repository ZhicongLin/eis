package com.cgcg.eis.domain.vo;

import com.cgcg.eis.domain.model.IpqcItem;
import com.cgcg.eis.domain.model.IpqcProblem;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class IpqcListVo {

    private List<IpqcItem> ipqcItems;

    private List<IpqcProblem> ipqcProblems;
}
