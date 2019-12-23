package com.cgcg.eis.domain.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "ipqc_item")
public class IpqcItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String enName;
    private String remark;
    private Integer type;
    private Integer eff;
    @JsonFormat
    private Date createTime;
    @JsonFormat
    private Date updateTime;
}
