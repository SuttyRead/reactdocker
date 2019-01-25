package com.ua.sutty.springRestApi.repository;

import com.ua.sutty.springRestApi.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findRoleByName(String name);

    Role findRoleById(Long id);

}
