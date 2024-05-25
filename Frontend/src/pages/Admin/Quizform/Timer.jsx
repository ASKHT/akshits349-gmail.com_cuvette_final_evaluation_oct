import React from "react";
import styles from "./Quizform.module.css";

const Timer = ({ setData, activequestion }) => {
  const handletimer = (timerValue) => {
    setData((prevArr) => {
      const newArr = { ...prevArr }; // Create a copy of the array
      newArr.questions[activequestion] = {
        ...newArr.questions[activequestion],
        timer: timerValue,
      };
      return newArr;
    });
  };

  return (
    <div className={styles.timerwrapper}>
      <div className={styles.timer}>
        <div>Timer</div>
        <div
          className={styles.buttontimer}
          onClick={() => handletimer("OFF")} // Pass the value directly
        >
          <p> OFF</p>
        </div>
        <div
          className={styles.buttontimer}
          onClick={() => handletimer("5")} // Pass the value directly
        >
          <p>5</p>
        </div>
        <div
          className={styles.buttontimer}
          onClick={() => handletimer("10")} // Pass the value directly
        >
          <p>10</p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
