import { useState } from "react";
import Login from "../../components/Auth/Login.jsx";
import styles from "./Auth.module.css";
import Signup from "../../components/Auth/Signup.jsx";
import logo from "../../assets/quizzielogo.png"
const Auth = () => {
  const [isLogin, setLogin] = useState(true);
  return (
    <div className={styles.authWrapper}>
      <div className={styles.auth}>
        <div style={{paddingTop:"3rem",paddingBottom:"2rem"}}>
            <img src={logo}/>
        </div>
        <div className={styles.choices}>
          <button
            className={!isLogin ? styles.selectedItem : ""}
            onClick={() => {
              setLogin(!isLogin);
            }}
          >
            Sign up
          </button>
          <button
            className={isLogin ? styles.selectedItem : ""}
            onClick={() => {
              setLogin(!isLogin);
            }}
          >
            Log in
          </button>
        </div>

        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Auth;


