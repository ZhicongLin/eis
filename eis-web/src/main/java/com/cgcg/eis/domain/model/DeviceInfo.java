package com.cgcg.eis.domain.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
@Data
@Entity
@Table(name = "device_info")
public class DeviceInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String name;
    private String model;
    private String company;
    private String contractor;
    private String image1;
    private String image2;
    private String image3;
    private Date createTime;
    private Date updateTime;
}
