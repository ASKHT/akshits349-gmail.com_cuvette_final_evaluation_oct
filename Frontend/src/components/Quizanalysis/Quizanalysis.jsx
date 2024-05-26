import styles from "./Quizanalysis.module.css";
import { useContext } from "react";
import Usercontext from "../../Context/Usercontext";
import line from "../../assets/line.png";
const Quizanalysis = () => {
  const quiz = {
    arr: [1, 2, 3, 4, 5],
    question: "what is the question we have to check",
  };
  const { quiztype } = useContext(Usercontext);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.quizHeading}> Question Analysis</h1>
      <div className={styles.quizExtraDetails}>
        <div className={styles.createdAt}>Created on : 24:05:2024</div>
        <div className={styles.impressions}>impressions : 4</div>
      </div>
      <div className={styles.questions}>
        {quiz?.arr.map((q, i) => (
          <div className={styles.question} key={q}>
            <h2>
              Q.{i + 1} {quiz.question}
            </h2>

            <div className={styles.options}>
              <div className={styles.optionCard}>
                <div className={styles.Answer}>{`${4 + 5}`}</div>
                <div className={styles.optionTitle}>
                  people Attempted the questions
                </div>
              </div>
              <div className={styles.optionCard}>
                <div className={styles.Answer}>{1}</div>
                <div className={styles.optionTitle}>
                  people Answered Correctly
                </div>
              </div>
              <div className={styles.optionCard}>
                <div className={styles.Answer}>{2}</div>
                <div className={styles.optionTitle}>
                  people Answered incorrectly
                </div>
              </div>
            </div>

            {/* <div className={styles.options}>
              {quiz.arr.map((v, x) => (
                <div className={styles.pollCard} key={x}>
                  <div className={styles.pollAnswer}>{v} </div>
                  <div className={styles.optionTitle}>Option {x + 1} </div>
                </div>
              ))}
            </div> */}
            <img src={line} className={styles.lineQuiz} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizanalysis;
