import React, { useState, useEffect } from "react";
import Title from "./title.js";

const Todolist = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);

  const getTasks = async () => {
    try {
      const url = "https://playground.4geeks.com/todo/users/daviddavid1";
      const response = await fetch(url);
      const responseData = await response.json();
      if (response.ok) {
        setList(responseData.todos);
      } else {
        console.error("Error fetching tasks:", responseData);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (label) => {
    try {
      const url = "https://playground.4geeks.com/todo/todos/daviddavid1";
      const requestBody = {
        label,
        is_done: false
      };
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      };
      const response = await fetch(url, request);
      const responseData = await response.json();
      if (response.ok) {
        setList([...list, responseData]);
      } else {
        console.error("Error adding task:", responseData);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    addTask(inputValue.trim());
    setInputValue("");
  };

  const deleteTask = async (taskId) => {
    try {
      const url = `https://playground.4geeks.com/todo/todos/${taskId}`;
      const request = {
        method: "DELETE"
      };
      const response = await fetch(url, request);
      if (response.ok) {
        setList(list.filter(task => task.id !== taskId));
        console.log(taskId);
      } else {
        const responseData = await response.json();
        console.error("Error deleting task:", responseData);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container d-flex justify-content-center flex-column text-center mt-5">
      <Title />
      <div className="mt-1 mb-2">
        <form className="d-flex justify-content-between" onSubmit={handleSubmit}>
          <input
            className="form-control text-wrap flex-grow-1"
            placeholder="Write your task here!"
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button type="submit" className="ms-1 btn btn-success">Add</button>
        </form>
      </div>
      <h2 className="mt-2 text-start">Pending tasks</h2>
      <div className="list">
        <ul className="list-group">
          {list.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between hidden-icon"
            >
              {task.label}
              <span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="btn btn-sm btn-danger"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </span>
            </li>
          ))}
          <li className="list-group-item bg-light text-white bg-dark text-start">
            {list.length === 0
              ? "No tasks. Please add a new task."
              : `${list.length} Item${list.length === 1 ? "" : "s"} Left`}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
