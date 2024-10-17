import React, { useEffect, useState } from 'react'

const History = () => {
    const [todos,setTodo]=useState();
    const fetchTodos=async()=>{
        const user=localStorage.getItem("username")
        const data=await fetch(`http://localhost:8080/todo/${user}`);
        setTodo(await data.json())
    }
    useEffect(()=>{
        fetchTodos();
    },[])
  return (
    <>
   {todos && todos.length > 0 ? (
        todos.map((todo, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-md mb-4">
            <h3 className="text-xl font-bold mb-2">Task Details</h3>
            <p><strong>Task:</strong> {todo.task}</p>
            <p><strong>Status:</strong> {todo.status}</p>
            <p><strong>Created At:</strong> {new Date(todo.date).toLocaleString()}</p>

            <h3 className="text-lg font-semibold mt-4">History:</h3>
            <div className="list-disc list-inside">
              {todo.li && todo.li.length > 0 ? (
                todo.li.map((log, index) => (
                  <div key={index} className="mb-1">
                    <p><strong>Field:</strong> {log.field}</p>
                    <p><strong>Old Value:</strong> {log.oldValue}</p>
                    <p><strong>New Value:</strong> {log.newValue}</p>
                    <p><strong>Changed At:</strong> {new Date(log.date).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p>No history available.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No todos available.</p>
      )}
    </>
  )
}

export default History;