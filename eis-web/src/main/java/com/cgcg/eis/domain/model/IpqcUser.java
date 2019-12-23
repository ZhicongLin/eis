package com.cgcg.eis.domain.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "ipqc_user")
public class IpqcUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String ipqcName;
    private String phone;
    private Integer sex;
    private Integer status;
    private Date createTime;
    private Date updateTime;

}
