package com.cgcg.eis.domain.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Constant {
    private Long id;
    private String paramKey;
    private String paramVal;
    private String remark;
    private Integer status;

    @Id
    @Column(name = "id", nullable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "param_key", nullable = true, length = 32)
    public String getParamKey() {
        return paramKey;
    }

    public void setParamKey(String paramKey) {
        this.paramKey = paramKey;
    }

    @Basic
    @Column(name = "param_val", nullable = true, length = 255)
    public String getParamVal() {
        return paramVal;
    }

    public void setParamVal(String paramVal) {
        this.paramVal = paramVal;
    }

    @Basic
    @Column(name = "remark", nullable = true, length = 255)
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Basic
    @Column(name = "status", nullable = true)
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Constant constant = (Constant) o;
        return Objects.equals(id, constant.id) && Objects.equals(paramKey, constant.paramKey) && Objects.equals(paramVal, constant.paramVal) && Objects.equals(remark, constant.remark) && Objects.equals(status, constant.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, paramKey, paramVal, remark, status);
    }
}
