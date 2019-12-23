package com.cgcg.eis.domain.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
@Data
@Entity
@Table(name = "device_recode")
public class DeviceRecode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private Long deviceId;
    private String area;
    private String qrCodeNo;
    private String remark;
    private String modifyDesc;
    private String imageUri;
    @OneToOne(targetEntity = IpqcUser.class)
    @JoinColumn(name = "ipqc_id")
    private IpqcUser ipqcUser;
    private Integer ipqcResult;
    @JsonFormat
    private Date ipqcTime;
    @JsonFormat
    private Date createTime;
    @JsonFormat
    private Date updateTime;

}
