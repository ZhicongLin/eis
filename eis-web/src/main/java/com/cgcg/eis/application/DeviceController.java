package com.cgcg.eis.application;

import com.cgcg.eis.domain.model.Device;
import com.cgcg.eis.domain.repository.ConstantRepository;
import com.cgcg.eis.domain.service.DeviceService;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Slf4j
@Controller
@RequestMapping("device")
public class DeviceController {

    @Resource
    private DeviceService deviceService;
    @Resource
    private ConstantRepository constantRepository;

    @GetMapping("index")
    public String index(Model model) {
        model.addAttribute("myHost", this.constantRepository.findFirstByParamKey("my_host"));
        return "device/index";
    }


    @GetMapping("form")
    public String form(Model model) {
        model.addAttribute("myHost", this.constantRepository.findFirstByParamKey("my_host"));
        return "device/form";
    }

    @GetMapping("/devices")
    @ResponseBody
    public PageInfo<Device> devices(int pageSize, int pageNum) {
        return this.deviceService.findList(null, pageSize, pageNum);
    }
}