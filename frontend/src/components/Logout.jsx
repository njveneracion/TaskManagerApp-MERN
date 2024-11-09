import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
