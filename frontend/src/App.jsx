import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";
import Logout from "./components/Logout";
import TaskForm from "./components/TaskForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskList />}>
          <Route path="/tasks/create-task" element={<TaskForm />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
