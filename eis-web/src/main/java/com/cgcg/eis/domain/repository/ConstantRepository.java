package com.cgcg.eis.domain.repository;

import com.cgcg.eis.domain.model.Constant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConstantRepository extends JpaRepository<Constant, Long> {

    Constant findFirstByParamKey(String key);
}
