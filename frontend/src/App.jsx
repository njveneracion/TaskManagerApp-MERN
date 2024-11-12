import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";
import Logout from "./components/Logout";
import TaskForm from "./components/TaskForm";
import Hero from "./components/Hero";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskList />}>
          <Route path="/tasks/create-task" element={<TaskForm />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
