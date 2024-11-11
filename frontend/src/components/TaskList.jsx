import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import TaskForm from "./TaskForm";
import { io } from "socket.io-client";
import Button from "react-bootstrap/esm/Button";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    };
    fetchTasks();

    const socket = io("http://localhost:5000");

    socket.on("taskCreated", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAsCompleted = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <h2>Add Task</h2>
            <TaskForm />
          </div>
          <div className="col-md-8">
            <div className="row">
              {tasks.map((task) => (
                <div className="col-md-6 mb-4" key={task._id}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h4 className="card-title">{task.title.toUpperCase()}</h4>
                      <p className="card-text">{task.description}</p>
                      <Button
                        variant="success"
                        onClick={() => markAsCompleted(task.id)}
                        disabled={task.completed}>
                        {task.completed ? "Completed" : "Mark as completed"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
