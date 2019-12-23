package com.cgcg.eis.domain.mapper;

import com.cgcg.eis.domain.model.IpqcUser;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.*;

@Mapper
public interface IpqcUserMapper {

    @Select("<script>" +
            "select * from ipqc_user " +
            "<if test='userName != null and userName !=\"\"'>" +
            "   where ipqc_name like concat('%',#{userName} ,'%')" +
            "</if>" +
            "</script>")
    Page<IpqcUser> findByName(@Param("userName") String userName);

}
