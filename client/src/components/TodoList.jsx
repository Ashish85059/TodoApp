import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const TodoList = () => {
  const [todos, setTodos] = useState([]); 
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editStatus, setEditStatus] = useState('pending');
  const [user, setUser] = useState('');

  // filters
  const [filterStatus, setFilterStatus] = useState('all'); 
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUser(storedUser);
    fetchTodos(storedUser);
  }, []);

  const fetchTodos = async (storedUser) => {
    try {
      const response = await fetch(`http://localhost:8080/todo/${storedUser}`);
      const data = await response.json(); 
      setTodos(Array.isArray(data) ? data : []); 
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const todoData = { task, status: "pending" };

    try {
      await fetch(`http://localhost:8080/todo/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      setTask('');
      fetchTodos(user);
    } catch (err) {
      console.error('Error saving todo:', err);
    }
  };

  const handleEdit = (todo) => {
    setEditTask(todo.task);
    setEditStatus(todo.status);
    setEditId(todo.id); 
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/todo/${id}/${user}`, {
        method: 'DELETE',
      });
      fetchTodos(user); 
    } catch (err) {
      toast.error('Error deleting todo');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedTodo = { task: editTask, status: editStatus };

    try {
      await fetch(`http://localhost:8080/todo/${editId}/${user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      setEditId(null);
      fetchTodos(user);
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };
  
  const filteredTodos = todos
    .filter(todo => filterStatus === 'all' || todo.status === filterStatus)
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2"
        >
          <option value="asc">Sort by Date Ascending</option>
          <option value="desc">Sort by Date Descending</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Todo
        </button>
      </form>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Task</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo) => (
            <tr key={todo.id}>
              <td className="border border-gray-300 p-2">
                {editId === todo.id ? (
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  todo.task
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editId === todo.id ? (
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="border p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  todo.status
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editId === todo.id ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white p-1 rounded mr-1"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(todo)}
                      className="bg-yellow-500 text-white p-1 rounded mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
