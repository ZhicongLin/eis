package com.cgcg.eis.domain.service;

import com.cgcg.eis.domain.model.IpqcProblem;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface IpqcProblemService {

    List<IpqcProblem> findList();

    PageInfo<IpqcProblem> findListPage();

    void save(IpqcProblem problem);
}
