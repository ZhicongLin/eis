package com.cgcg.eis.application;

import com.cgcg.eis.domain.model.IpqcUser;
import com.cgcg.eis.domain.service.UserService;
import com.cgcg.eis.domain.vo.UserLoginVo;
import com.cgcg.eis.infrastructure.common.Constant;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Slf4j
@Controller
@RequestMapping("users")
public class UserController {

    @Resource
    private UserService userService;

    /**
     * 登陆接口 .
     *
     * @Param: [session, model, username, password]
     * @Return: java.lang.String
     * @Author: ZhiCong Lin
     * @Date: 2018/11/22 14:10
     */
    @PostMapping("login")
    public String userLogin(HttpSession session, Model model, String username, String password) {
        final UserLoginVo login = this.userService.login(username, password);
        if (login != null) {
            session.setAttribute(Constant.SESSION_LOGIN_AUTH, login);
            return "redirect:/index";
        }
        return "redirect:/index/login";
    }

    @GetMapping("index")
    public String userIndex() {
        return "user/index";
    }

    @PostMapping
    @ResponseBody
    public int save(@ModelAttribute IpqcUser user) {
        this.userService.save(user);
        return 1;
    }
    @GetMapping
    @ResponseBody
    public PageInfo<IpqcUser> pageList(@RequestParam(required = false) String userName, Integer pageNum, Integer pageSize) {
        return this.userService.findList(userName, pageNum, pageSize);
    }

    @PutMapping("pwd")
    @ResponseBody
    public int modifyPwd(Long id, String oldPassword, String confirmPassword) {
        this.userService.modifyPassword(id, oldPassword, confirmPassword);
        return 1;
    }

    @PutMapping("reset")
    @ResponseBody
    public int reset(Long id) {
        this.userService.reset(id);
        return 1;
    }

}