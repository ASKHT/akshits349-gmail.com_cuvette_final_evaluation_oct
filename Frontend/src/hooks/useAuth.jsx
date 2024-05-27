import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UseAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("token"));

    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate("/auth");
    }
  }, [navigate, isLoggedIn]);

  return isLoggedIn;
};

export default UseAuth;
