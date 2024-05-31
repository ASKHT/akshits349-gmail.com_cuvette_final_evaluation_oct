import React from "react";
import Modal from "../Modal/Modal.jsx";
import { useContext } from "react";
import Usercontext from "../../Context/Usercontext.js";
import styles from "./Sharequiz.module.css";
import cross from "../../assets/cross.png";
import toast from "react-hot-toast";
const Sharequizmodal = () => {
  const { modal, setShowmodal, shareid } = useContext(Usercontext);
  const copytext = () => {
    navigator.clipboard.writeText(`http://localhost:5173/quiz/${shareid}`);
    toast.success("link copied successfully");
  };
  return (
    <Modal setShowmodal={setShowmodal}>
      <div className={styles.wrapper}>
        <div className={styles.charmCross}>
          <img src={cross} onClick={() => setShowmodal("")} />
        </div>
        <div className={styles.headingCongrats}>
          Congrats your Quiz is Published!
        </div>

        <div className={styles.linkContainer}>
          {`http://localhost:5173/quiz/${shareid}`}
        </div>
        <button className={styles.share} onClick={copytext}>
          Share
        </button>
      </div>
    </Modal>
  );
};

export default Sharequizmodal;
