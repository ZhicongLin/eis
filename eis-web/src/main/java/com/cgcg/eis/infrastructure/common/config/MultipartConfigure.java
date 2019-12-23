package com.cgcg.eis.infrastructure.common.config;

import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.Configuration;

/**
 * 版本相关配置.
 *
 * @Author: ZhiCong.Lin
 * @Create: 2018-12-04 16:10
 */
@Configuration
public class MultipartConfigure {
    @Autowired
    private ObjectFactory<HttpMessageConverters> messageConverters;

}
