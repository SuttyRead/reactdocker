package com.ua.sutty.springRestApi.security;

import com.ua.sutty.springRestApi.domain.User;
import com.ua.sutty.springRestApi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class DetailsService implements UserDetailsService {

    @Autowired
    private UserRepository users;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        User user = users.findUserByLogin(login);
        if (user == null) {
            throw new UsernameNotFoundException(login + " was not found");
        }

        String userRole = user.getRole().getName();
        SimpleGrantedAuthority grantedAuthority = new SimpleGrantedAuthority(userRole);
        return new org.springframework.security.core.userdetails.User(
                user.getLogin(),
                user.getPassword(),
                Collections.singletonList(grantedAuthority)
        );
    }

}