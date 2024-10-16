package com.TodoApp.TodoApp.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TodoListDTO {
    private String id;
    private String task;
    private String status;
    private LocalDateTime date;


    public TodoListDTO(TodoList todo) {
        this.id = todo.getId().toString();
        this.task = todo.getTask();
        this.status = todo.getStatus();
        this.date = todo.getDate();
    }

}
