package com.cgcg.eis.application;

import com.cgcg.eis.domain.model.DeviceInfo;
import com.cgcg.eis.domain.service.DeviceInfoService;
import com.cgcg.eis.infrastructure.common.util.FileUtils;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

@Slf4j
@Controller
@RequestMapping("device/info")
public class DeviceInfoController {

    @Resource
    private DeviceInfoService deviceInfoService;

    @Value("${user.home}")
    private String fileHome;
    @GetMapping("index")
    public String index(Model model) {
        DeviceInfo deviceInfo =  this.deviceInfoService.findById(1);
        model.addAttribute("info", deviceInfo);
        return "device/info/index";
    }


    @GetMapping("form")
    public String form(Model model) {
        return "device/info/form";
    }

    @GetMapping("/devices")
    @ResponseBody
    public PageInfo<DeviceInfo> devices(String keyword, Integer pageSize, Integer pageNum) {
        return new PageInfo<>();
//        return this.deviceInfoService.findList(keyword, pageSize, pageNum);
    }

    @PostMapping("/save")
    public String save(MultipartFile file1, MultipartFile file2, MultipartFile file3, @ModelAttribute DeviceInfo deviceInfo) {
        final String path1 = FileUtils.uploadBackground(file1, fileHome);
        final String path2 = FileUtils.uploadBackground(file2, fileHome);
        final String path3 = FileUtils.uploadBackground(file3, fileHome);
        if (StringUtils.isNotBlank(path1)) {
            deviceInfo.setImage1("/device/front/loadFile?path=" + path1);
        }
        if (StringUtils.isNotBlank(path2)) {
            deviceInfo.setImage2("/device/front/loadFile?path=" + path2);
        }
        if (StringUtils.isNotBlank(path3)) {
            deviceInfo.setImage3("/device/front/loadFile?path=" + path3);
        }
        this.deviceInfoService.save(deviceInfo);
        return "redirect:/device/info/index";
    }
}