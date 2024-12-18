import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../context/AuthContext";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { GrTasks } from "react-icons/gr";
import { Button } from "react-bootstrap";

const Header = ({ transparent, fixed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <Navbar
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: transparent ? "rgba(0, 0, 0, 0.2)" : "#212529",
        backdropFilter: transparent ? "blur(5px)" : "none",
      }}>
      <Container>
        <Navbar.Brand className="d-flex align-items-center gap-2 text-white">
          <GrTasks /> <span>doThis</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="text-white">
            Signed in as:{" "}
            {user ? (
              <span className="text-warning">{user.name}</span>
            ) : (
              <span className="text-warning">Guest</span>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
        {user ? (
          <button onClick={handleLogout} className="btn btn-outline-light ms-3">
            <RiLogoutBoxLine /> Logout
          </button>
        ) : (
          <Button
            variant="outline-light"
            onClick={() => navigate("/login")}
            className="ms-3">
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
