import React from "react";
import Modal from "../Modal/Modal.jsx";
import { useContext } from "react";
import Usercontext from "../../Context/Usercontext.js";
import styles from "./Sharequiz.module.css";
import cross from "../../assets/cross.png";
import toast from "react-hot-toast";
const Sharequizmodal = () => {
  const { modal, setShowmodal, shareid, quiztype, setQuiztype, setInputdata } =
    useContext(Usercontext);
  const copytext = () => {
    quiztype === "Q&A"
      ? navigator.clipboard.writeText(
          `https://aksquizzie.netlify.app/quiz/${shareid}`
        )
      : navigator.clipboard.writeText(
          `https://aksquizzie.netlify.app/poll/${shareid}`
        );
    toast.success("link copied successfully");
  };
  const handleclose = () => {
    setShowmodal("");
    setQuiztype("");
  };
  return (
    <Modal
      setShowmodal={setShowmodal}
      setQuiztype={setQuiztype}
      setInputdata={setInputdata}
    >
      <div className={styles.wrapper}>
        <div className={styles.charmCross}>
          <img src={cross} onClick={() => handleclose()} />
        </div>
        <div className={styles.headingCongrats}>
          Congrats your Quiz is Published!
        </div>

        <div className={styles.linkContainer}>
          {quiztype === "Q&A"
            ? `http://localhost:5173/quiz/${shareid}`
            : `http://localhost:5173/poll/${shareid}`}
        </div>
        <button className={styles.share} onClick={copytext}>
          Share
        </button>
      </div>
    </Modal>
  );
};

export default Sharequizmodal;
