package com.cgcg.eis.infrastructure.common;

import lombok.Getter;
import lombok.Setter;

/**
 * feign.
 *
 * @Author: ZhiCong.Lin
 * @Create: 2018-12-05 16:10
 */
@Setter
@Getter
public class ErrorRersult {

    int errorCode;

    String errorMsg;
}
