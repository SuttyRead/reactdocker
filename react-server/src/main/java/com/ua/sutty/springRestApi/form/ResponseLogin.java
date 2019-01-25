package com.ua.sutty.springRestApi.form;

import com.ua.sutty.springRestApi.domain.Role;
import lombok.Data;

@Data
public class ResponseLogin {

    private String login;
    private String token;
    private Role role;


}
