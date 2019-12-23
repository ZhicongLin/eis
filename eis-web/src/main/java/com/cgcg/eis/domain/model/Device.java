package com.cgcg.eis.domain.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
@Data
@Entity
@Table(name = "device")
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    @OneToOne(targetEntity = DeviceInfo.class)
    @JoinColumn(name = "device_info_id")
    private DeviceInfo deviceInfo;
    private String deviceCode;
    private String qrCodeNo;
    private String address;
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
