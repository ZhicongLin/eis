package com.cgcg.eis.infrastructure.service;

import com.cgcg.eis.domain.mapper.IpqcUserMapper;
import com.cgcg.eis.domain.model.AdminUser;
import com.cgcg.eis.domain.model.IpqcUser;
import com.cgcg.eis.domain.repository.AdminUserRepository;
import com.cgcg.eis.domain.repository.IpqcUserRepository;
import com.cgcg.eis.domain.service.UserService;
import com.cgcg.eis.domain.vo.UserLoginVo;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private IpqcUserRepository ipqcUserRepository;
    @Resource
    private AdminUserRepository adminUserRepository;
    @Resource
    private IpqcUserMapper ipqcUserMapper;

    public UserLoginVo login(String username, String pwd) {
        final UserLoginVo user = new UserLoginVo();
        final AdminUser adminUser = this.adminUserRepository.findByUserName(username);
        if (adminUser != null && adminUser.getUserPwd().equals(pwd)) {
            user.setName(adminUser.getRealName());
            user.setId(adminUser.getId());
            return user;
        }
        return null;
    }

    @Override
    public PageInfo<IpqcUser> findList(String userName, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        final Page<IpqcUser> users = ipqcUserMapper.findByName(userName);
        return users.toPageInfo() != null ? users.toPageInfo() : new PageInfo<>();
    }

    @Override
    public void save(IpqcUser user) {
        if (user.getId() != null && user.getId() != 0) {
            final Optional<IpqcUser> ou = this.ipqcUserRepository.findById(user.getId());
            if (ou.isPresent()) {
                final IpqcUser ipqcUser = ou.get();
                ipqcUser.setPhone(user.getPhone());
                ipqcUser.setIpqcName(user.getIpqcName());
                ipqcUser.setSex(user.getSex());
                ipqcUser.setStatus(user.getStatus());
                ipqcUser.setUpdateTime(new Date());
                this.ipqcUserRepository.save(ipqcUser);
            }
        } else {
            user.setCreateTime(new Date());
            this.ipqcUserRepository.save(user);
        }

    }

    @Override
    public void modifyPassword(Long id, String oldPassword, String confirmPassword) {
        final Optional<AdminUser> admin = this.adminUserRepository.findById(id);
        if (admin.isPresent()) {
            final AdminUser adminUser = admin.get();
            if (oldPassword.equals(adminUser.getUserPwd())) {
                adminUser.setUserPwd(confirmPassword);
                adminUser.setUpdateTime(new Date());
                this.adminUserRepository.save(adminUser);
            }
        }
    }

    @Override
    public void reset(Long id) {
        final Optional<AdminUser> admin = this.adminUserRepository.findById(id);
        if (admin.isPresent()) {
            final AdminUser adminUser = admin.get();
            adminUser.setUserPwd("123456");
            adminUser.setUpdateTime(new Date());
            this.adminUserRepository.save(adminUser);
        }
    }
}
