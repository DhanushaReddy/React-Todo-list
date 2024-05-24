import React, { useState } from "react";
import "./styles.css";
import Screen from "./Screen";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo.trim()) return;

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      date: formatDate(selectedDate),
      checked: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTodo("");
    setSelectedDate(selectedDate);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };

  const editTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editingText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditing(null);
    setEditingText("");
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    const isSameDate = todo.date === formatDate(selectedDate);
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (filter === "all") return isSameDate && (!searchActive || matchesSearch);
    if (filter === "completed")
      return isSameDate && todo.checked && (!searchActive || matchesSearch);
    if (filter === "incomplete")
      return isSameDate && !todo.checked && (!searchActive || matchesSearch);
    return false;
  });

  return (
    <Screen>
      <h1>Todo-List</h1>
      <div className="whole">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks by name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchActive(false);
            }}
          />
          <button className="search-btn" onClick={() => setSearchActive(true)}>
            <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              placeholder="Add new task"
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button className="forBtn" type="submit">
              Add tasks
            </button>
          </div>
          <div className="filter-container">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
            <button onClick={() => setFilter("incomplete")}>Incomplete</button>
          </div>
          <div>
            {filteredTodos.map((todo) => (
              <div key={todo.id} className="todo-item">
                {todoEditing === todo.id ? (
                  <input
                    placeholder="Edit the task"
                    className="in"
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                    value={editingText}
                  />
                ) : (
                  <div className={`display ${todo.checked ? "completed" : ""}`}>
                    {todo.text}
                    <pre> Due: {todo.date}</pre>
                  </div>
                )}
                <div className="contain">
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  {todoEditing === todo.id ? (
                    <button className="edit" onClick={() => editTodo(todo.id)}>
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit"
                      onClick={() => setEditing(todo.id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </form>
        <div className="calendar-container">
          <input
            type="text"
            name="date"
            id="date"
            placeholder="Open Calendar"
            onFocus={(e) => {
              e.target.type = "date";
              e.target.showPicker();
            }}
            onBlur={(e) => {
              e.target.type = "text";
              if (e.target.value) {
                setSelectedDate(new Date(e.target.value));
              }
            }}
          />
        </div>
      </div>
    </Screen>
  );
}
