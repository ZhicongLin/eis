package com.cgcg.eis.domain.vo;

import com.cgcg.eis.domain.model.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DeviceRecodeVo {

    private Device device;
    private DeviceRecode deviceRecord;
    private List<IpqcRecodeItemVo> recodeList;
    private List<IpqcProblem> problems;

    public DeviceRecodeVo(Device device, DeviceRecode deviceRecord) {
        this.device = device;
        this.deviceRecord = deviceRecord;
    }

    public void setRecodeList(List<IpqcRecode> recodes, List<IpqcItem> ipqcItems, List<IpqcProblem> problems) {
        this.problems = problems;
        this.recodeList = new ArrayList<>();
        for (IpqcRecode recode : recodes) {
            final Long itemId = recode.getItemId();
            final IpqcRecodeItemVo recodeItems = this.getIpqcRecodeItems(itemId, ipqcItems);
            if (recodeItems == null) {
                continue;
            }
            final Long problemId = recode.getProblemId();
            if (problemId == null) {
                recodeItems.setStatus(recode.getStatus());
                continue;
            }
            for (IpqcProblem problem : problems) {
                final boolean equals = problemId.equals(problem.getId());
                if (equals) {
                    List<IpqcProblemVo> problemList = recodeItems.getProblems();
                    if (problemList == null) {
                        problemList = new ArrayList<>();
                    }
                    final IpqcProblemVo ipqcProblemVo = new IpqcProblemVo(problem.getId(), problem.getName(), problem.getEnName(), recode.getStatus());
                    problemList.add(ipqcProblemVo);
                    recodeItems.setProblems(problemList);
                }
            }
        }
    }

    private IpqcRecodeItemVo getIpqcRecodeItems(Long  itemId, List<IpqcItem> ipqcItems) {
        IpqcRecodeItemVo riv = null;
        for (IpqcRecodeItemVo recodeItemVo : this.recodeList) {
            if (itemId.equals( recodeItemVo.getIpqcItem().getId())) {
                riv = recodeItemVo;
            }
        }
        if (riv == null) {
            IpqcItem ipqcItem = null;
            for (IpqcItem item : ipqcItems) {
                if (item.getId().equals(itemId)) {
                    ipqcItem = item;
                    break;
                }
            }
            if (ipqcItem == null) {
                return null;
            }
            riv = new IpqcRecodeItemVo(ipqcItem);
            this.recodeList.add(riv);
        }
        return riv;
    }
}
