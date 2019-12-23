package com.cgcg.eis.infrastructure.common.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Web系统相关配置
 *
 * @author zhizhao.wang
 */
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

    /**
     * 拦截注意
     *
     * @param registry 注册
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor()).excludePathPatterns("/index/login",
                "/index/logout",
                "/index/regist",
                "/index/forget",
                "/users/login",
                "/device/front/**",
                "/device/front/form",
                "/error",
                "/css/**",
                "/fonts/*",
                "/images/*",
                "/scripts/**").addPathPatterns("/**");
        super.addInterceptors(registry);
    }
}
