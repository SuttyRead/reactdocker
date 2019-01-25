package com.ua.sutty.springRestApi.form;

import com.ua.sutty.springRestApi.domain.Role;
import com.ua.sutty.springRestApi.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserForm {

    private String login;
    private String email;
    private String password;
    private String confirmPassword;
    private String firstName;
    private String lastName;
    private Date birthday;

    public User toUser() {
        return User.builder()
                .login(login)
                .password(password)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .birthday(birthday)
                .role(new Role(2L, "USER"))
                .build();
    }

}
