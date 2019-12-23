package com.cgcg.eis.domain.service;

import com.cgcg.eis.domain.model.IpqcUser;
import com.cgcg.eis.domain.vo.UserLoginVo;
import com.github.pagehelper.PageInfo;

/**
 * 用户service.
 *
 * @Author: ZhiCong.Lin
 * @Create: 2018-11-13 14:03
 */
public interface UserService {

    UserLoginVo login(String username, String pwd);

    PageInfo<IpqcUser> findList(String userName, Integer pageNum, Integer pageSize);

    void save(IpqcUser user);

    void modifyPassword(Long id, String oldPassword, String confirmPassword);

    void reset(Long id);
}
