package com.cgcg.eis.application;

import com.cgcg.eis.domain.model.IpqcProblem;
import com.cgcg.eis.domain.service.IpqcProblemService;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * project controller.
 *
 * @Author: ZhiCong.Lin
 * @Create: 2018-11-14 09:57p
 */
@Controller
@RequestMapping("problems")
public class ProblemsController {
    @Resource
    private IpqcProblemService ipqcProblemService;

    @GetMapping("index")
    public String index() {
        return "problems/index";
    }

    @GetMapping("form")
    public String form() {
        return "problems/form";
    }

    @GetMapping
    @ResponseBody
    public PageInfo<IpqcProblem> pageList() {
        return this.ipqcProblemService.findListPage();
    }

    @PostMapping
    @ResponseBody
    public int save(IpqcProblem Problem) {
        this.ipqcProblemService.save(Problem);
        return 1;
    }

}
