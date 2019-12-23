package com.cgcg.eis.domain.repository;

import com.cgcg.eis.domain.model.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

    AdminUser findByUserName(String username);
}
