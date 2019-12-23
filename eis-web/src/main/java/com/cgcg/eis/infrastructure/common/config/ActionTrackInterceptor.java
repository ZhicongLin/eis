package com.cgcg.eis.infrastructure.common.config;


import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * 请求拦截
 *
 * @author zhizhao.wang
 */
@Component
public class ActionTrackInterceptor implements ClientHttpRequestInterceptor {

    public ClientHttpResponse intercept(HttpRequest httpRequest, byte[] body, ClientHttpRequestExecution clientHttpRequestExecution) throws IOException {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        // 获取登录Token
        //        TokenVo tokenVo = (TokenVo) request.getSession().getAttribute(Constant.SESSION_LOGIN_AUTH);

        // 存在token则将请求添加到头信息中
        //        if (tokenVo != null) {
        //            HttpHeaders headers = httpRequest.getHeaders();

        //            headers.add("Authorization", tokenVo.getToken_type() + " " + tokenVo.getAccess_token());
        //        }


        return clientHttpRequestExecution.execute(httpRequest, body);
    }
}
