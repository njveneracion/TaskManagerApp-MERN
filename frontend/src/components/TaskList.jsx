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
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 border p-3 rounded">
            <h2>Add Task</h2>
            <TaskForm />
          </div>
          <div className="col-md-8">
            <div className="row">
              {tasks.map((task) => (
                <div className="col-md-6 mb-4" key={task._id}>
                  <div className="card h-100">
                    <div className="card-body">
                      {task.completed ? (
                        <>
                          <h4 className="card-title">
                            <s> {task.title.toUpperCase()}</s>
                          </h4>
                          <p className="card-text">
                            <s>{task.description}</s>
                          </p>
                        </>
                      ) : (
                        <>
                          <h4 className="card-title">
                            {task.title.toUpperCase()}
                          </h4>
                          <p className="card-text">{task.description}</p>
                        </>
                      )}
                      <Button
                        variant={
                          task.completed ? "secondary" : "outline-success"
                        }
                        size="sm"
                        onClick={() =>
                          toggleTaskCompletion(task._id, task.completed)
                        }>
                        {task.completed ? "Completed" : <FaCheck />}
                      </Button>
                      <Button
                        size="sm"
                        className="ms-2"
                        variant="outline-danger"
                        onClick={() => deleteTask(task._id)}>
                        <RiDeleteBin6Fill />
                      </Button>
                      <Button
                        size="sm"
                        className="ms-2"
                        variant="outline-warning"
                        onClick={() => handleShow(task)}>
                        <FaEdit />
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Edit Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              type="text"
                              value={currentTask.title || ""}
                              onChange={(e) =>
                                setCurrentTask({
                                  ...currentTask,
                                  title: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={currentTask.description || ""}
                              onChange={(e) =>
                                setCurrentTask({
                                  ...currentTask,
                                  description: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
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
