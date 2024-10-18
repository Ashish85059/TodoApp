import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const TodoList = () => {
  const [todos, setTodos] = useState([]); 
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editStatus, setEditStatus] = useState('pending');
  const [user, setUser] = useState('');
  const [priority, setPriority] = useState('low');

  // filters
  const [filterStatus, setFilterStatus] = useState('all'); 
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUser(storedUser);
    fetchTodos(storedUser);
  }, []);

  const fetchTodos = async (storedUser) => {
    try {
      const response = await fetch(`http://localhost:8080/todo/${storedUser}`);
      const data = await response.json(); 
      console.log(data);
      setTodos(Array.isArray(data) ? data : []); 
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const todoData = { task, status: "pending", priority };

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
      setPriority("low");
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

  
  const getPriorityRank = (priority) => {
    switch (priority) {
      case 'high':
        return 3;
      case 'medium':
        return 2;
      default:
        return 1;
    }
  };

  const filteredTodos = todos
    .filter(todo => filterStatus === 'all' || todo.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'date') {
        if (sortOrder === 'asc') {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      } else if (sortBy === 'priority') {
        if (sortOrder === 'asc') {
          return getPriorityRank(a.priority) - getPriorityRank(b.priority);
        } else {
          return getPriorityRank(b.priority) - getPriorityRank(a.priority);
        }
      }
    });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-200'; 
      case 'medium':
        return 'bg-yellow-200';
      case 'low':
      default:
        return 'bg-green-200';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>

      <div className="mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
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
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add To List
        </button>
      </form>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Date Added</th>
            <th className="border border-gray-300 p-2">Task</th>
            {/* <th className="border border-gray-300 p-2">Priority</th> */}
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo) => (
            <tr key={todo.id} className={getPriorityColor(todo.priority)}>
              <td className="border border-gray-300 p-2">
                {new Date(todo.date).toLocaleDateString()}
              </td>
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
              {/* <td className="border border-gray-300 p-2">{todo.priority}</td> */}
              <td className="border border-gray-300 p-2">
                {editId === todo.id ? (
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="border p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="In Progress">In Progress</option>
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

export default TodoList
