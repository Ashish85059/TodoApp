package com.TodoApp.TodoApp.controllers;

import com.TodoApp.TodoApp.entity.TodoList;
import com.TodoApp.TodoApp.entity.User;
import com.TodoApp.TodoApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity< List<User>> getAllUsers(){
        return new ResponseEntity<>( userService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/login")
    public  ResponseEntity<?>loginUser(@RequestBody User data){
//        System.out.println("data-> "+data);
        List<User> users=userService.getAll();
        for(User user:users){
            if(user.getUserName().equals(data.getUserName()) && user.getPassword().equals(data.getPassword())){
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<?> createMapping(@RequestBody User user){
        try{
            return userService.saveEntry(user);

        } catch (Exception e) {
            return new ResponseEntity<>(e,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{userName}")
    public  ResponseEntity<?> updateUser(@RequestBody User user,@PathVariable String userName){
        try{
            User dbUser=userService.findByUserName(userName);
            if(dbUser!=null){
                if(!user.getUserName().equals(""))
                    dbUser.setUserName(user.getUserName());
                if(!user.getPassword().equals(""))
                    dbUser.setPassword(user.getPassword());

                userService.saveEntry(dbUser);
                return new ResponseEntity<>(user,HttpStatus.OK);
            }
            return new ResponseEntity<>("No user found",HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(e,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
