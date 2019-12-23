package com.cgcg.eis.domain.mapper;

import com.cgcg.eis.domain.model.IpqcItem;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface IpqcItemMapper {

    @Select("<script>" +
            "select * from ipqc_item where eff = 0 " +
            "<if test='name != null and name !=\"\"'>" +
            "   and `name` like concat('%',#{name} ,'%') or en_name like  concat('%',#{name} ,'%')" +
            "</if>" +
            "</script>")
    Page<IpqcItem> findByName(@Param("name") String name);

}
