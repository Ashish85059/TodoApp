package com.TodoApp.TodoApp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class History {
    private String field;
    private String oldValue;
    private String newValue;
    private LocalDateTime date;

}
