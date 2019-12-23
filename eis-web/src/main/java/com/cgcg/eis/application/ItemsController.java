package com.cgcg.eis.application;

import com.cgcg.eis.domain.model.IpqcItem;
import com.cgcg.eis.domain.service.IpqcItemService;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * project controller.
 *
 * @Author: ZhiCong.Lin
 * @Create: 2018-11-14 09:57
 */
@Controller
@RequestMapping("items")
public class ItemsController {
    @Resource
    private IpqcItemService ipqcItemService;

    @GetMapping("index")
    public String index() {
        return "items/index";
    }

    @GetMapping("form")
    public String form() {
        return "items/form";
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
