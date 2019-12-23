package com.cgcg.eis.domain.vo;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.*;
import javax.persistence.Id;

/**
 * 用户登录vo.
 *
 * @Author: ZhiCong.Lin
 * @Create: 2018-11-13 09:48
 */
@Setter
@Getter
public class UserLoginVo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

}
