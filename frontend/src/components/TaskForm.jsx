import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const result = await axios.post(
        "http://localhost:5000/api/tasks/create",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setDescription("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" className="w-100" onClick={handleSubmit}>
        Add Task
      </Button>
    </Form>
  );
};

export default TaskForm;