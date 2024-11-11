import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../context/AuthContext";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { GrTasks } from "react-icons/gr";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className="d-flex align-items-center gap-2">
          <GrTasks /> <span>do.this</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Signed in as: {user ? user.name : "Guest"}</Navbar.Text>
        </Navbar.Collapse>
        {user && (
          <button onClick={handleLogout} className="btn btn-outline-light ms-3">
            <RiLogoutBoxLine /> Logout
          </button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
