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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

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
      toast.error("Task deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Can't delete task");
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
      toast.success("Task updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Can't update task");
    }
  };

  const handleUpdateTask = () => {
    updateTask(currentTask._id, currentTask.title, currentTask.description);
  };

  return (
    <div>
      <Header transparent={false} fixed={true} />
      <div
        style={{
          background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
          minHeight: "94vh",
          paddingTop: "1rem",
          marginTop: "3rem",
        }}>
        <div className="container py-5 pb-5">
          <div className="row g-4">
            <div
              className="col-md-4"
              style={{
                position: "sticky",
                top: "0",
                height: "fit-content",
              }}>
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
              <h1 className="">Tasks</h1>
              <hr />
              {tasks.length === 0 ? (
                <div className="alert alert-info">
                  No tasks available. Add a new task.
                </div>
              ) : (
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
                            <div>
                              <h5
                                className={`card-title mb-0 ${
                                  task.completed
                                    ? "text-decoration-line-through"
                                    : ""
                                }`}>
                                {task.title.toUpperCase()}
                              </h5>
                              <p
                                style={{
                                  fontSize: "12px",
                                }}
                                className={`${
                                  task.completed
                                    ? "text-decoration-line-through"
                                    : ""
                                } text-muted`}>
                                {format(
                                  new Date(task.createdAt),
                                  "p MMMM dd, yyyy"
                                )}
                              </p>
                            </div>

                            <div className="btn-group">
                              <Button
                                variant={
                                  task.completed
                                    ? "secondary"
                                    : "outline-success"
                                }
                                size="sm"
                                className="rounded-pill me-2"
                                onClick={() =>
                                  toggleTaskCompletion(task._id, task.completed)
                                }>
                                {task.completed ? "Completed" : <FaCheck />}
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="rounded-pill me-2"
                                onClick={() => deleteTask(task._id)}>
                                <RiDeleteBin6Fill />
                              </Button>
                              <Button
                                variant="outline-warning"
                                size="sm"
                                className="rounded-pill"
                                onClick={() => handleShow(task)}>
                                <FaEdit />
                              </Button>
                            </div>
                          </div>
                          <hr />

                          <p
                            className={`card-text ${
                              task.completed
                                ? "text-decoration-line-through"
                                : ""
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: task.description,
                            }}></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <ReactQuill
              value={currentTask.description || ""}
              onChange={(value) =>
                setCurrentTask({ ...currentTask, description: value })
              }
              theme="snow"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
