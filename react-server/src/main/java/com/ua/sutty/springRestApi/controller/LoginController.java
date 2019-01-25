package com.ua.sutty.springRestApi.controller;

import com.ua.sutty.springRestApi.domain.User;
import com.ua.sutty.springRestApi.form.LoginIsAvailable;
import com.ua.sutty.springRestApi.form.LoginForm;
import com.ua.sutty.springRestApi.form.ResponseLogin;
import com.ua.sutty.springRestApi.form.UserForm;
import com.ua.sutty.springRestApi.service.UserService;
import com.ua.sutty.springRestApi.utils.GenerateToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(methods = {RequestMethod.OPTIONS, RequestMethod.GET,
        RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.POST, RequestMethod.HEAD}, origins = "*")
@RestController
public class LoginController {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final GenerateToken generateToken;

    @Autowired
    public LoginController(UserService userService, PasswordEncoder passwordEncoder, GenerateToken generateToken) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.generateToken = generateToken;
    }

    @PostMapping("/login")
    public ResponseLogin login(@RequestBody LoginForm loginForm) {
        User userByLogin = userService.findUserByLogin(loginForm.getLogin());
        if (userByLogin == null) {
            return new ResponseLogin();
        }
        if (passwordEncoder.matches(loginForm.getPassword(), userByLogin.getPassword())) {
            ResponseLogin responseLogin = new ResponseLogin();
            responseLogin.setLogin(userByLogin.getLogin());
            responseLogin.setRole(userByLogin.getRole());
            responseLogin.setToken(generateToken.generateToken(loginForm));
            return responseLogin;
        } else {
            return new ResponseLogin();
        }
    }

    @PostMapping("/registration")
    public User saveUser(@RequestBody UserForm userForm) {
        User user = userForm.toUser();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.save(user);
    }

    @GetMapping("/checkLogin/{login}")
    public LoginIsAvailable checkLogin(@PathVariable String login) {
        if (userService.findUserByLogin(login) == null) {
            return new LoginIsAvailable(true);
        } else {
            return new LoginIsAvailable(false);
        }
    }

}
