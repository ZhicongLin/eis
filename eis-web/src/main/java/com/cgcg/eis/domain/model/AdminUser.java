package com.cgcg.eis.domain.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "admin_user")
public class AdminUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String userName;
    private String userPwd;
    private String realName;
    private Integer status;
    private Date createTime;
    private Date updateTime;

}
