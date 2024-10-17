package com.TodoApp.TodoApp.services;

import com.TodoApp.TodoApp.entity.User;
import com.TodoApp.TodoApp.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> saveEntry(User user){
        List<User>users=userRepository.findAll();
        for(User it:users){
            if(user.getUserName().equals(it.getUserName())) {
                    System.out.println("Same user");
                    return new ResponseEntity<>("User already exists", HttpStatus.BAD_REQUEST);
                }
        }
        userRepository.save(user);
        return new ResponseEntity<>("Success",HttpStatus.OK);
    }

    public List<User> getAll(){
        return userRepository.findAll();
    }

    public Optional<User> getById(ObjectId id){
        return userRepository.findById(id);
    }

    public void deleteById(ObjectId id){
        userRepository.deleteById(id);
    }

    public User findByUserName(String userName){
       // System.out.println("user -> "+userName);
        return userRepository.findByUserName(userName);
    }

}
