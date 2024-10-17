package com.TodoApp.TodoApp.entity;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "todo_list")
@Data
@NoArgsConstructor
public class TodoList {

    @Id
    private ObjectId id;
    private String task;
    private String status;
    private LocalDateTime date;
    private List<History>history=new ArrayList<>();

    @JsonGetter("id")
    public String getIdAsString() {
        return id.toString();
    }
//    public void addChangeLog(String field, String oldValue, String newValue) {
//        history.add(new History(field, oldValue, newValue, LocalDateTime.now()));
//    }
}
