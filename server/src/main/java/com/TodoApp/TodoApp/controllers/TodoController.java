package com.TodoApp.TodoApp.controllers;

import com.TodoApp.TodoApp.entity.TodoList;
import com.TodoApp.TodoApp.entity.TodoListDTO;
import com.TodoApp.TodoApp.entity.User;
import com.TodoApp.TodoApp.services.TodoService;
import com.TodoApp.TodoApp.services.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/todo")
public class TodoController {
    @Autowired
    UserService userService;
    @Autowired
    TodoService todoService;

    @GetMapping("/{userName}")
    public ResponseEntity<List<TodoListDTO>> getList(@PathVariable String userName){
        try {
            User data = userService.findByUserName(userName);
            List<TodoListDTO> todoList = new ArrayList<>();

            for (TodoList task : data.getTasks()) {
                todoList.add(new TodoListDTO(task));
            }

            return new ResponseEntity<>(todoList, HttpStatus.OK);

        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{userName}")
    public ResponseEntity<?>addTodo(@RequestBody TodoList todo,@PathVariable  String userName){
        try{
            User user=userService.findByUserName(userName);
            if(user==null)return new ResponseEntity<>("No User Found",HttpStatus.NOT_FOUND);
            todoService.saveEntry(todo,userName);
            return new ResponseEntity<>("Todo added",HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{todoId}/{userName}")
    public ResponseEntity<?>deleteById(@PathVariable ObjectId todoId,@PathVariable String userName){
        try{
            todoService.deleteById(todoId,userName);
            return new ResponseEntity<>("deleted Successfully" ,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @PutMapping("/{todoId}/{userName}")
    public  ResponseEntity<?>updateTodo(@PathVariable ObjectId todoId,@PathVariable String userName,@RequestBody TodoList task){
        todoService.updateTodo(todoId,userName,task);
        System.out.println("task-> "+task);
        return new ResponseEntity<>("Task Updated",HttpStatus.OK);
    }
}
