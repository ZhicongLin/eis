package com.cgcg.eis.infrastructure.service;

import com.cgcg.eis.domain.model.IpqcProblem;
import com.cgcg.eis.domain.repository.IpqcProblemRepository;
import com.cgcg.eis.domain.service.IpqcProblemService;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class IpqcProblemServiceImpl implements IpqcProblemService {
    @Resource
    IpqcProblemRepository ipqcProblemRepository;
    @Override
    public List<IpqcProblem> findList() {
        return this.ipqcProblemRepository.findAll();
    }

    @Override
    public PageInfo<IpqcProblem> findListPage() {
        final PageInfo<IpqcProblem> ipqcProblemPageInfo = new PageInfo<>();
        ipqcProblemPageInfo.setList(this.findList());
        return ipqcProblemPageInfo;
    }

    @Override
    public void save(IpqcProblem problem) {
        final Long id = problem.getId();
        if (id != null && id != 0) {
            final Optional<IpqcProblem> problemOptional = this.ipqcProblemRepository.findById(id);
            if (problemOptional.isPresent()) {
                final IpqcProblem p = problemOptional.get();
                p.setEnName(problem.getEnName());
                p.setName(problem.getName());
                p.setUpdateTime(new Date());
                this.ipqcProblemRepository.save(p);
            }
        } else {
            problem.setCreateTime(new Date());
            this.ipqcProblemRepository.save(problem);
        }
    }
}
