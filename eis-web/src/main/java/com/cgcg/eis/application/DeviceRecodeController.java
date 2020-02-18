package com.cgcg.eis.application;

import com.cgcg.eis.domain.model.Constant;
import com.cgcg.eis.domain.model.IpqcItem;
import com.cgcg.eis.domain.repository.ConstantRepository;
import com.cgcg.eis.domain.service.IpqcItemService;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * project controller.
 *
 * @Author: ZhiCong.Lin
 * @Create: 2018-11-14 09:57
 */
@Controller
@RequestMapping("recodes")
public class DeviceRecodeController {
    @Resource
    private IpqcItemService ipqcItemService;
    @Resource
    private ConstantRepository constantRepository;
    @GetMapping("index")
    public String index(Model model) {
        final Constant myHost = this.constantRepository.findFirstByParamKey("my_host");
        model.addAttribute("myHost", myHost.getParamVal());
        return "recode/index";
    }

    @GetMapping
    @ResponseBody
    public PageInfo<IpqcItem> pageList(@RequestParam(required = false) String keyword, Integer pageNum, Integer pageSize) {
        return this.ipqcItemService.findListPage(keyword, pageNum, pageSize);
    }

    @PostMapping("del")
    @ResponseBody
    public int delete(@RequestParam Long id) {
        this.ipqcItemService.delete(id);
        return 1;
    }

    @PostMapping
    @ResponseBody
    public int save(IpqcItem item) {
        this.ipqcItemService.save(item);
        return 1;
    }

}
