import React, { useState } from "react";
import Modal from "../../../components/Modal/Modal.jsx";
import styles from "./Createquiz.module.css";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import Quizform from "../Quizform/Quizform.jsx";
import Pollform from "../Pollform/Pollform.jsx";
import { useContext } from "react";
import Usercontext from "../../../Context/Usercontext.js";
const Createquiz = ({ setShowmodal, modal }) => {
  const { quiztype, setQuiztype, inputdata, setInputdata } =
    useContext(Usercontext);
  const takedata = (e) => {
    setInputdata(e.target.value);
  };
  // console.log(inputdata);
  const handlecontinue = () => {
    if (!inputdata) {
      toast.error("Quiz name can't be empty");
      return;
    }
    if (quiztype != "Q&A" && quiztype != "poll") {
      toast.error("Quiz Type can't be empty");
      return;
    }
    const quizType = quiztype == "Q&A" ? "Q&A" : "Poll";
    // console.log(typeof quizType);

    setShowmodal(quizType);
    // console.log(modal);
  };
  return (
    <>
      <Modal setShowmodal={setShowmodal}>
        <div className={styles.quizwrapper}>
          <div>
            <input
              type="text"
              placeholder="Quiz Name"
              className={styles.input}
              onChange={takedata}
            />
          </div>
          <div className={styles.quiztype}>
            <div className={styles.text}>Quiz Type</div>
            <div
              className={
                quiztype === "Q&A"
                  ? styles.activequizoptionbutton
                  : styles.quizoptionbutton
              }
              onClick={() => setQuiztype("Q&A")}
            >
              Q & A
            </div>
            <div
              className={
                quiztype === "poll"
                  ? styles.activequizoptionbutton
                  : styles.quizoptionbutton
              }
              onClick={() => setQuiztype("poll")}
            >
              Poll Type
            </div>
          </div>
          <div className={styles.actionbuttoncontainer}>
            <button
              className={styles.actionbutton1}
              onClick={() => setShowmodal("")}
            >
              Cancel
            </button>
            <button className={styles.actionbutton2} onClick={handlecontinue}>
              Continue
            </button>
          </div>
        </div>
      </Modal>
      {modal === "Q&A" && <Quizform inputdata={inputdata} type={quiztype} />}
      {modal === "Poll" && <Pollform />}
    </>
  );
};

export default Createquiz;
