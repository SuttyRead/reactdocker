package com.ua.sutty.springRestApi.controller;

import com.ua.sutty.springRestApi.domain.User;
import com.ua.sutty.springRestApi.form.UserForm;
import com.ua.sutty.springRestApi.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.List;

@CrossOrigin(methods = {RequestMethod.OPTIONS, RequestMethod.GET,
        RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.POST, RequestMethod.HEAD}, origins = "*")
@RestController
public class UserController {

    private final PasswordEncoder passwordEncoder;

    private final UserService userService;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    @PostMapping("/users")
    public User saveUser(@RequestBody UserForm userForm) {
        User user = userForm.toUser();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.save(user);
    }

    @PutMapping("/users/{id}")
    public User updateUserById(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return userService.save(user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
    }

    @GetMapping("/users")
    public List<User> userList() {
        return userService.findAll();
    }

}
