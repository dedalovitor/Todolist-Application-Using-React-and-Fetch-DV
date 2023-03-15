import React, { useState, useEffect } from "react";
import Title from "./title.js"

const Todolist = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);

  const getTasks = async () => {
    const url =
      "https://assets.breatheco.de/apis/fake/todos/user/pina";
    const request = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, request);
    const responseJson = await response.json();
    responseJson.map((task) => {
      setList((x) => [...x, task.label]);
    });
  };

  const putTasks = async (tasks) => {
    const url =
      "https://assets.breatheco.de/apis/fake/todos/user/pina";
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    };
    const response = await fetch(url, request);
    const responseJSON = await response.json();
  };

  const addTask = (event) => {
    event.preventDefault();
    if (inputValue === "") return;
    else {
      let tasksPut = [];
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        let item = {};
        item["label"] = element;
        item["done"] = false;
        tasksPut.push(item);
      }
      tasksPut.push({ label: inputValue, done: false });
      putTasks(tasksPut);
      setList([...list, inputValue]);
      setInputValue("");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = (index) => {
    setList(
      list.filter((element, id) => {
        return index !== id;
      })
    );
  };
  return (
    <div className="container d-flex justify-content-center flex-column text-center mt-5">
    <Title/>
      <div className="mt-1 mb-2">
        <form className="d-flex justify-content-between" onSubmit={addTask}>
          <input
            className="form-control text-wrap flex-grow-1"
            placeholder="Write your task here!"
            type="text"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
          <button className="ms-1 btn btn-success" 
            onClick={() => {
              {addTask()}
              }}>Add
          </button> 
        </form>
      </div>
      <h2 className="mt-2 text-start">Pending tasks</h2>
      <div className="list">
        <ul className="list-group">
          {list.map((listElement, index) => {
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between hidden-icon"
              >
                {listElement}
                <span>
                  <a
                    key={index}
                    onClick={(event) => {
                      deleteTask(index);
                    }}
                    className="list-group-item rounded-0 border d-flex justify-content-between align-items-center"
                            style={{cursor:"pointer"}}
                            >
                    <i className="fas fa-trash text-danger"></i>
                  </a>
                </span>
              </li>
            );
          })}
          <span className="list-group-item bg-light text-white bg-dark text-start">
            {list.length === 0
              ? "No tasks. Please add a new task."
              : list.length + " Item Left"}
          </span>
        </ul>
      </div>
    </div>
  );
};

export default Todolist;