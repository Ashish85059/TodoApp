package com.TodoApp.TodoApp.entity;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class TodoListDTO {
    private String id;
    private String task;
    private String status;
    private LocalDateTime date;
    private String priority;
    private List<History> li;


    public TodoListDTO(TodoList todo) {
        this.id = todo.getId().toString();
        this.task = todo.getTask();
        this.status = todo.getStatus();
        this.date = todo.getDate();
        this.li=todo.getHistory();
        this.priority=todo.getPriority();
    }

}
