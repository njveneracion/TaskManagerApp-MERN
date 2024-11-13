import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Header from "./Header";
import TaskForm from "./TaskForm";
import Button from "react-bootstrap/Button";
import { FaCheck } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useTheme } from "./ThemeContext";
import "./TaskList.css"; // Create this CSS file for theme styles

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const { theme, toggleTheme } = useTheme();

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

  const toggleTaskCompletion = async (id, currentStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { completed: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: !currentStatus } : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (task) => {
    setCurrentTask(task);
    setShow(true);
  };

  const updateTask = async (id, title, description) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, title, description } : task
        )
      );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`task-list ${theme}`}>
      <Header transparent={false} />
      <button onClick={toggleTheme}>
        Toggle to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <div
        style={{
          background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
          minHeight: "94vh",
          paddingTop: "1rem", // Add spacing below header
        }}>
        <div className="container py-5 pb-5">
          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="card shadow-sm border-0 h-100"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                }}>
                <div className="card-body">
                  <h3 className="card-title mb-4 fw-bold">Add New Task</h3>
                  <TaskForm />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row g-4">
                {tasks.map((task) => (
                  <div className="col-md-6" key={task._id}>
                    <div
                      className="card shadow-sm border-0 h-100 task-card"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        transition: "transform 0.2s",
                      }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5
                            className={`card-title mb-0 ${
                              task.completed
                                ? "text-decoration-line-through"
                                : ""
                            }`}>
                            {task.title.toUpperCase()}
                          </h5>
                          <div className="btn-group">
                            <Button
                              variant={task.completed ? "secondary" : "success"}
                              size="sm"
                              className="rounded-pill me-2"
                              onClick={() =>
                                toggleTaskCompletion(task._id, task.completed)
                              }>
                              {task.completed ? "Completed" : <FaCheck />}
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              className="rounded-pill me-2"
                              onClick={() => deleteTask(task._id)}>
                              <RiDeleteBin6Fill />
                            </Button>
                            <Button
                              variant="warning"
                              size="sm"
                              className="rounded-pill"
                              onClick={() => handleShow(task)}>
                              <FaEdit />
                            </Button>
                          </div>
                        </div>
                        <p
                          className={`card-text ${
                            task.completed ? "text-decoration-line-through" : ""
                          }`}>
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={currentTask.title || ""}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, title: e.target.value })
              }
              className="border-0 shadow-sm"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={currentTask.description || ""}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, description: e.target.value })
              }
              className="border-0 shadow-sm"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              updateTask(
                currentTask._id,
                currentTask.title,
                currentTask.description
              )
            }>
            Update Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
