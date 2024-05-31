import styles from "./Quizanalysis.module.css";
import { useContext, useEffect, useState } from "react";
import Usercontext from "../../Context/Usercontext";
import line from "../../assets/line.png";
import { useParams } from "react-router-dom";
import { questionanalysis } from "../../api/User.api";

const Quizanalysis = () => {
  const { id } = useParams();
  const [dataanalysis, setAnalysisData] = useState({ type: "", questions: [] });
  const { quiztype } = useContext(Usercontext);

  useEffect(() => {
    questionanalysis(id)
      .then((res) => {
        setAnalysisData({
          type: res.data.category,
          questions: res.data.questions,
          createdAt: res.data.createdAt,
          impression: res.data.impression,
        });
      })
      .catch((error) => console.error(error));
  }, [id]);

  const formatDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString("en-IN", {
      year: "numeric",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.quizHeading}>Question Analysis</h1>
      <div className={styles.quizExtraDetails}>
        <div className={styles.createdAt}>
          {formatDate(dataanalysis.createdAt)}
        </div>
        <div className={styles.impressions}>{dataanalysis.impression}</div>
      </div>
      <div className={styles.questions}>
        {dataanalysis.questions.map((q, i) => (
          <div className={styles.question} key={q.id || i}>
            <h2>
              Q.{i + 1} {q?.question}
            </h2>

            {dataanalysis.type === "Q&A" && (
              <div className={styles.options}>
                <div className={styles.optionCard}>
                  <div className={styles.Answer}>{q.numOfAttempts}</div>
                  <div className={styles.optionTitle}>
                    people Attempted the questions
                  </div>
                </div>
                <div className={styles.optionCard}>
                  <div className={styles.Answer}>{q.numOFCorrect}</div>
                  <div className={styles.optionTitle}>
                    people Answered Correctly
                  </div>
                </div>
                <div className={styles.optionCard}>
                  <div className={styles.Answer}>
                    {q.numOfAttempts - q.numOFCorrect}
                  </div>
                  <div className={styles.optionTitle}>
                    people Answered incorrectly
                  </div>
                </div>
              </div>
            )}

            {dataanalysis.type === "poll" && (
              <div className={styles.options}>
                {q.options.map((option, index) => (
                  <div className={styles.pollCard} key={option.id || index}>
                    <div className={styles.pollAnswer}>{option.text}</div>
                    {/* <div>4</div> */}
                  </div>
                ))}
              </div>
            )}

            <img src={line} alt="line" className={styles.lineQuiz} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizanalysis;
