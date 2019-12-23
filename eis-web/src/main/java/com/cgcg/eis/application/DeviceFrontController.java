package com.cgcg.eis.application;

import com.cgcg.eis.domain.model.Device;
import com.cgcg.eis.domain.service.DeviceService;
import com.cgcg.eis.domain.service.IpqcItemService;
import com.cgcg.eis.domain.vo.DeviceRecodeCheckVo;
import com.cgcg.eis.domain.vo.DeviceRecodeVo;
import com.cgcg.eis.domain.vo.IpqcListVo;
import com.cgcg.eis.infrastructure.common.util.FileUtils;
import com.cgcg.eis.infrastructure.common.util.TimeUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

@Slf4j
@Controller
@RequestMapping("device/front")
public class DeviceFrontController {
    @Resource
    DeviceService deviceService;
    @Resource
    IpqcItemService ipqcItemService;
    @Value("${user.home}")
    private String fileHome;

    @GetMapping("/index")
    public String front(Model model, String code) {
        final Device device = deviceService.findByQrCode(code);
        model.addAttribute("device", device);
        model.addAttribute("count", deviceService.recodeCount(device.getId()));
        return "device/front-index";
    }

    @GetMapping("/recode")
    public String recode(Model model, Long deviceId, @RequestParam(required = false) String timeStr) {
        model.addAttribute("deviceId", deviceId);
        return "device/front-recode";
    }

    @PostMapping("/recode/{deviceId}")
    @ResponseBody
    public List<DeviceRecodeVo> recodes(@PathVariable Long deviceId, @RequestParam(required = false) Integer time) {
        int day = -1;
        if (time == 1) {
            day = 0;
        } else if (time == 2) {
            day = 7;
        } else if (time == 3) {
            day = 30;
        }
        return this.deviceService.findAllRecode(deviceId, day == -1 ? null : TimeUtils.getPlusTime(day));
    }

    @PostMapping("/modifyCode/{deviceId}")
    @ResponseBody
    public int modifyCode(@PathVariable Long deviceId, @RequestParam(required = false) String code) {
        this.deviceService.modifyCode(deviceId, code);
        return 1;
    }
    @PostMapping("/modifyAddr/{deviceId}")
    @ResponseBody
    public int modifyAddr(@PathVariable Long deviceId, @RequestParam(required = false) String addr) {
        this.deviceService.modifyAddr(deviceId, addr);
        return 1;
    }

    @GetMapping("/form")
    public String frontForm(Model model, Long deviceId) {
        model.addAttribute("deviceId", deviceId);
        model.addAttribute("device", this.deviceService.findById(deviceId));
        return "device/front-form";
    }

    @PostMapping("/form")
    public String frontFormSave(Model model, MultipartFile fileUpload, @ModelAttribute DeviceRecodeCheckVo recode) {
        String path = null;
        if (fileUpload != null) {
            path = FileUtils.upload(fileUpload, fileHome);
        }
        Device device = this.deviceService.saveRecode(recode, path == null ? null : "/device/front/loadFile?path=" + path);
        if (device != null) {
            model.addAttribute("success_flag", 1); // 成功
            model.addAttribute("device", device);
            return "redirect:/device/front/index?code=" + device.getQrCodeNo();
        }
        model.addAttribute("success_flag", 0);
        model.addAttribute("deviceId", recode.getId());
        return "redirect:/device/front/form?deviceId=" + recode.getId();
    }

    @PostMapping("/checkItems")
    @ResponseBody
    public IpqcListVo checkItems(Long deviceId) {
        return ipqcItemService.findList();
    }

    @RequestMapping(value = "/loadFile")
    @ResponseBody
    public String createFolw(HttpServletResponse response, Model model, String path) {
        response.setContentType("image/*");
        //取路径
        FileInputStream fis = null;
        OutputStream os = null;
        try {
            fis = new FileInputStream(path);
            os = response.getOutputStream();
            int count = 0;
            byte[] buffer = new byte[1024 * 8];
            while ((count = fis.read(buffer)) != -1) {
                os.write(buffer, 0, count);
                os.flush();
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        } finally {
            try {
                if (fis != null) fis.close();
                if (os != null) os.close();
            } catch (IOException e) {
                log.error(e.getMessage(), e);
            }
        }

        return "ok";
    }

}