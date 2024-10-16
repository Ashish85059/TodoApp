package com.TodoApp.TodoApp.repository;

import com.TodoApp.TodoApp.entity.TodoList;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepository extends MongoRepository<TodoList, ObjectId> {
//    void findByIdAndUpdate(ObjectId id, TodoList todoList);
}
