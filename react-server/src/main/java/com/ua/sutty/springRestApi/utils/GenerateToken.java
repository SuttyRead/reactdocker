package com.ua.sutty.springRestApi.utils;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import com.ua.sutty.springRestApi.form.LoginForm;
import org.springframework.stereotype.Component;

@Component
public class GenerateToken {

    public String generateToken(LoginForm loginForm) {
        return Base64.encode((loginForm.getLogin() + ":" + loginForm.getPassword()).getBytes());
    }

}
