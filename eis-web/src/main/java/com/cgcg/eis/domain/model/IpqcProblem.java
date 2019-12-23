package com.cgcg.eis.domain.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "ipqc_problem")
public class IpqcProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String enName;
    private Date createTime;
    private Date updateTime;

}
