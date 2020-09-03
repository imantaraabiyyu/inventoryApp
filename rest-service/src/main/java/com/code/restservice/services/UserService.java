package com.code.restservice.services;

import com.code.restservice.entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService
    extends CommonService<User, String>, UserDetailsService {}
