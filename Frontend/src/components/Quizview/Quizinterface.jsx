import { useState } from "react";
import styles from "./Quizinterface.module.css";
import logo from "../../assets/quizzielogo.png";
const QuizInterface = ({}) => {
  const questiondata = { title: "what is the question" };
  return (
    <div className={styles.quizData}>
      <div className={styles.quizDetails}>
        <div className={styles.questionNumber}>
          {1}/{2}
        </div>

        <div className={styles.timer}>00:{10}s</div>
      </div>

      <>
        <div className={styles.question}>{questiondata.title}</div>
        <div className={styles.options}>
          <div>
            {/* <img className={styles.imageOption} src={logo} alt="logo" /> */}
          </div>

          <div className={styles.textUrlContainer}>
            <div>
              <p>{12}</p>
              {/* <img className={styles.imgOption} src={logo} alt="img" /> */}
            </div>
          </div>
        </div>
      </>

      <div className={styles.buttonContainer}>
        <button className={styles.button}>NEXT</button>
        {/* <button className={styles.button}>SUBMIT</button> */}
      </div>
    </div>
  );
};

export default QuizInterface;
