import { useState } from "react";
import Quizinterface from "../../components/Quizview/Quizinterface.jsx";
import styles from "./Quiz.module.css";
const Quiz = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <Quizinterface />

        {/* {finalPage && <QuizResult quizType={quizType} result={result} />} */}
      </div>
    </div>
  );
};

export default Quiz;
