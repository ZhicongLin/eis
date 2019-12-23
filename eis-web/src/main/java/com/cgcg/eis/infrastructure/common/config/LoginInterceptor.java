package com.cgcg.eis.infrastructure.common.config;


import com.cgcg.eis.infrastructure.common.Constant;
import org.apache.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 登录拦截器
 *
 * @author zhizhao.wang
 */
@Component
public class LoginInterceptor extends HandlerInterceptorAdapter {

    /**
     * 登录界面
     */
    private static final String LOGIN_HTML = "/index/login";

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {

        Object sessionLoginAuth = httpServletRequest.getSession().getAttribute(Constant.SESSION_LOGIN_AUTH);
        // 判断是否已登录
        if (sessionLoginAuth != null) {
            return true;
        }

        // 如果是Ajax请求，则直接返回状态码
        String xrw = httpServletRequest.getHeader("X-Requested-With");
        if ("XMLHttpRequest".equalsIgnoreCase(xrw)) {
            httpServletResponse.setStatus(HttpStatus.SC_UNAUTHORIZED);
            return false;
        }

        httpServletRequest.getSession().setAttribute("lastUri", httpServletRequest.getRequestURI());
        // 传统请求
        httpServletResponse.sendRedirect(LOGIN_HTML);
        return false;
    }

}
