import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Button from "react-bootstrap/Button";

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
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-column align-items-center card container">
        <h1 className="fw-bold">Tasks</h1>
        <Button variant="primary">Add Task</Button>
        <div>
          {tasks.map((task) => (
            <div className="card mb-2" key={task._id}>
              <h4> {task.title.toUpperCase()}</h4>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskList;
