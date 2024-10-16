package com.TodoApp.TodoApp.entity;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "todo_list")
@Data
@NoArgsConstructor
public class TodoList {

    private ObjectId id;
    private String task;
    private String status;
    private LocalDateTime date;

    @JsonGetter("id")
    public String getIdAsString() {
        return id.toString();  // Return ObjectId as string
    }
}
