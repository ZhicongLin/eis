package com.cgcg.eis.domain.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "ipqc_recode")
public class IpqcRecode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long deviceId;
    private Long deviceRecordId;
    private Long itemId;
    private Long problemId;
    private Integer status;
    private Date createTime;
}
