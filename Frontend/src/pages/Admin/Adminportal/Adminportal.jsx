import React, { useContext, useState } from "react";
import styles from "./Adminportal.module.css";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import quizlogo from "../../../assets/quizzielogo.png";
import Createquiz from "../Createquiz/Createquiz";
import Quizform from "../Quizform/Quizform";
import Pollform from "../Pollform/Pollform";
import UseAuth from "../../../hooks/useAuth";
import Usercontext from "../../../Context/Usercontext";
import Sharequizmodal from "../../../components/Sharequiz/Sharequizmodal";
const Adminportal = () => {
  // const [modal, setShowmodal] = useState("");
  const navigate = useNavigate();
  const {
    quizcreated,
    setQuizcreated,
    modal,
    setShowmodal,
    isedit,
    setisEdit,
  } = useContext(Usercontext);
  const location = useLocation();
  // console.log(location.pathname);
  const isLoggedIn = UseAuth();
  const useraction = () => {
    setQuizcreated(false);
    setShowmodal("quiz");
    setisEdit("");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };
  const gotohomepage = () => {
    navigate("/");
  };
  return (
    isLoggedIn && (
      <div className={styles.adminscreen}>
        {/* leftsidebar */}
        <div className={styles.leftsidebar}>
          <div style={{ marginTop: "3rem" }}>
            <img
              src={quizlogo}
              style={{ width: "11rem" }}
              alt="Quiz Logo"
              onClick={gotohomepage}
            />
          </div>
          <div className={styles.menucontainer}>
            <div>
              <Link to="/">
                <div
                  className={
                    location.pathname === "/"
                      ? styles.menuitemsactive
                      : styles.menuitems
                  }
                >
                  Dashboard
                </div>
              </Link>
            </div>
            <div>
              <Link to="/analytics">
                <div
                  className={
                    location.pathname === "/analytics"
                      ? styles.menuitemsactive
                      : styles.menuitems
                  }
                >
                  Analytics
                </div>
              </Link>
            </div>
            <div>
              <div className={styles.menuitems} onClick={() => useraction()}>
                Create Quiz
              </div>
            </div>
          </div>
          <div className={styles.logoutcontainer}>
            <div
              style={{
                paddingBottom: "0.25rem",
                borderBottomWidth: "2px",
                borderBottomStyle: "solid",
                borderBottomColor: "#000000",
                width: "12rem",
              }}
            ></div>
            <p className={styles.logoutbtn} onClick={handleLogout}>
              Logout
            </p>
          </div>
        </div>
        {/* rightsidebar */}
        <div className={styles.rightsidebar}>
          <Outlet />
        </div>
        {modal === "quiz" && (
          <Createquiz setShowmodal={setShowmodal} modal={modal} />
        )}
        {modal === "Q&A" && (
          <Quizform setShowmodal={setShowmodal} modal={modal} />
        )}
        {modal === "Poll" && (
          <Pollform setShowmodal={setShowmodal} modal={modal} />
        )}
        {modal === "share" && <Sharequizmodal />}
      </div>
    )
  );
};

export default Adminportal;
