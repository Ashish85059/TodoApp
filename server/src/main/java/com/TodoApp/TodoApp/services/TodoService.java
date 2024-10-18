package com.TodoApp.TodoApp.services;

import com.TodoApp.TodoApp.entity.History;
import com.TodoApp.TodoApp.entity.TodoList;
import com.TodoApp.TodoApp.entity.User;
import com.TodoApp.TodoApp.repository.TodoRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin
@Component
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserService userService;

    public void saveEntry(TodoList todo, String userName) {
        try {
            User user = userService.findByUserName(userName);

//            System.out.println("user-> " + user);
            todo.setDate(LocalDateTime.now());
            TodoList savedTodo = todoRepository.save(todo);
            user.getTasks().add(savedTodo);
//            System.out.println("saved todo -> "+savedTodo);
            userService.updateUser(user);
//            System.out.println("user-> "+user);

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void saveEntry(TodoList todo) {
        todoRepository.save(todo);
    }

    public List<TodoList> getAll(String username) {
        User data = userService.findByUserName(username);
//        System.out.println("data-> "+data);
        return data.getTasks();
    }


    public void deleteById(ObjectId id, String username) {
        User data = userService.findByUserName(username);
        data.getTasks().removeIf(x -> x.getId().equals(id));
        userService.saveEntry(data);
        todoRepository.deleteById(id);
    }

    public void updateTodo(ObjectId id, String username, TodoList newTodo) {
        TodoList oldTodo = todoRepository.findById(id).orElse(null);
        User user=userService.findByUserName(username);
        History obj1=null;
        History obj2=null;
//        System.out.println("TAsk-> "+newTodo);
        if (oldTodo != null) {

            if (newTodo.getTask() != null && !newTodo.getTask().isEmpty()) {
                if(!oldTodo.getTask().equals(newTodo.getTask())){
                    obj1=new History("task",oldTodo.getTask(),newTodo.getTask(),LocalDateTime.now());
//                    System.out.println("obj1-> "+obj1);
                    oldTodo.getHistory().add(obj1);
                }
                oldTodo.setTask(newTodo.getTask());
            }

            if (newTodo.getStatus() != null && !newTodo.getStatus().isEmpty()) {
                if (!oldTodo.getStatus().equals(newTodo.getStatus())){
                    obj2 = new History("status", oldTodo.getStatus(),newTodo.getStatus(),LocalDateTime.now());
//                    System.out.println("obj2-> "+obj2);
                    oldTodo.getHistory().add(obj2);
                }
                oldTodo.setStatus(newTodo.getStatus());
            }
//            System.out.println("oldTodo-=>"+oldTodo);
            for(int i=0;i<user.getTasks().size();i++){
                if(user.getTasks().get(i).getId().equals(id)){
//                    System.out.println("Use-> "+oldTodo);
                    user.getTasks().set(i,oldTodo);
//                    if (obj1 != null) {
//                        user.getTasks().get(i).getHistory().add(obj1);
//                    }
//                    if (obj2 != null) {
//                        user.getTasks().get(i).getHistory().add(obj2);
//                    }
                    userService.saveEntry(user);
                    break;
                }
            }
            todoRepository.save(oldTodo);
        }
    }

}
