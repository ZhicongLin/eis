package com.cgcg.eis.domain.mapper;

import com.cgcg.eis.domain.model.Device;
import com.cgcg.eis.domain.model.IpqcUser;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.*;

@Mapper
public interface DeviceMapper {

    @Select("<script>" +
            "select * from device " +
            "<if test='addr != null and addr !=\"\"'>" +
            "   where address like concat('%',#{addr} ,'%') or device_code like concat('%',#{addr} ,'%')" +
            "</if>" +
            "</script>")
    @Results({
           @Result(property = "ipqcUser", column = "ipqc_id", one = @One(select = "findIpqcUser"))
    })
    Page<Device> findByAddress(@Param("addr") String address);

    @Select("select * from ipqc_user where id = #{id}")
    IpqcUser findIpqcUser(Long id);
}
