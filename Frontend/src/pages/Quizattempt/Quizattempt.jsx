import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Quizattempt.module.css";
import { countPollApi, getPollApi } from "../../api/Poll.api";

const Quizattempt = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [submit, setSubmit] = useState(false);

  const handleNext = () => {
    countPollApi(id, questions[activeQuestion]._id, selectedOption);
    setActiveQuestion(activeQuestion + 1);
    setSelectedOption(null);
  };

  const handleSelect = (id) => {
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    countPollApi(id, questions[activeQuestion]._id, selectedOption);
    setSubmit(true);
  };

  useEffect(() => {
    getPollApi(id)
      .then((res) => setQuestions(res.poll.questions))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.container}>
      {submit ? (
        <div className={styles.questionContainer}>
          <div className={styles.completePoll}>
            Thank you <br /> for participating in <br /> the Poll
          </div>
        </div>
      ) : (
        <div className={styles.questionContainer}>
          <div className={styles.topContainer}>
            <span className="">{`${activeQuestion + 1} / ${
              questions.length
            }`}</span>
            {/* <span className="">00:10s</span> */}
          </div>
          <h2 className={styles.question}>
            {questions[activeQuestion]?.question}
          </h2>
          <div className={styles.optionContainer}>
            {questions[activeQuestion]?.options.map((item, idx) => (
              <div
                key={item._id}
                className={`${styles.option} ${
                  item._id === selectedOption && styles.activeOption
                }`}
                onClick={() => handleSelect(item._id)}
              >
                {item.text && <div className={styles.text}>{item.text}</div>}
                {item.image && (
                  <img src={item.image} className={styles.image} />
                )}
                {console.log(item.image)}
              </div>
            ))}
          </div>
          <div className="">
            {activeQuestion < questions.length - 1 ? (
              <button className={styles.submit} onClick={handleNext}>
                NEXT
              </button>
            ) : (
              <button className={styles.submit} onClick={handleSubmit}>
                SUBMIT
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Quizattempt;
