package com.cgcg.eis.application;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

/**
 * 首页控制器.
 *
 * @Author: ZhiCong.Lin
 * @Create: 2018-11-13 13:47
 */
@Controller
@RequestMapping("/")
public class IndexController {

    /**
     * 首页
     *
     * @return
     */
    @GetMapping
    public String homePage() {
        return "index";
    }

    /**
     * 首页 .
     *
     * @Param: [model]
     * @Return: java.lang.String
     * @Author: ZhiCong Lin
     * @Date: 2018/11/13 13:50
     */
    @GetMapping(value = "index")
    public String index(Model model) {
        return "index";
    }

    /**
     * 登录页面 .
     *
     * @Return: java.lang.String
     * @Author: ZhiCong Lin
     * @Date: 2018/11/13 13:52
     */
    @GetMapping("/index/login")
    public String login() {
        return "login";
    }

    /**
     * 登录页面 .
     *
     * @Return: java.lang.String
     * @Author: ZhiCong Lin
     * @Date: 2018/11/13 13:52
     */
    @GetMapping("/index/logout")
    public String logout(HttpSession session) {
        session.setAttribute("userInfo", null);
        return "redirect:/index/login";
    }

    /**
     * 注册页面 .
     *
     * @Return: java.lang.String
     * @Author: ZhiCong Lin
     * @Date: 2018/11/13 13:52
     */
    @GetMapping("/index/regist")
    public String regist() {
        return "regist";
    }

    /**
     * 忘记密码页面.
     *
     * @Return: java.lang.String
     * @Author: ZhiCong Lin
     * @Date: 2018/11/14 9:45
     */
    @GetMapping("/index/forget")
    public String forget() {
        return "forget";
    }
}
