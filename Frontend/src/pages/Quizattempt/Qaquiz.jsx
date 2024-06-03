import { useState, useEffect, useRef } from "react";
import styles from "./Qaquiz.module.css";
import { useParams } from "react-router-dom";
import { countQuizApi, getQuizApi } from "../../api/Quiz.api";
import trophy from "../../assets/Trophy.png";

const Qaquiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [score, setScore] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [timelimit, setTimelimit] = useState(0);

  const timeRef = useRef();

  const handleNext = () => {
    countQuizApi(id, questions[activeQuestion]._id, selectedOption);
    setActiveQuestion(activeQuestion + 1);
    setSelectedOption(null);
  };

  const handleSelect = (idx) => {
    if (questions[activeQuestion]?.answer == `option${idx + 1}`) {
      setScore(score + 1);
    }
    setSelectedOption(`option${idx + 1}`);
  };

  const handleSubmit = () => {
    clearInterval(timeRef);
    countQuizApi(id, questions[activeQuestion]._id, selectedOption);
    setScore(score + 1);
    setSubmit(true);
  };

  useEffect(() => {
    getQuizApi(id)
      .then((res) => setQuestions(res.quiz.questions))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const handleTimer = (timer) => {
      setTimelimit(timer);
      if (timer > 0) {
        timeRef.current = setInterval(() => {
          setTimelimit((prev) => {
            prev = prev - 1;
            if (prev < 0 && activeQuestion < questions.length - 1) {
              countQuizApi(id, questions[activeQuestion]._id, selectedOption);
              // console.log(selectedOption);
              setActiveQuestion(activeQuestion + 1);
              setSelectedOption(null);
            } else if (prev < 0 && activeQuestion === questions.length - 1) {
              handleSubmit();
              clearInterval(timeRef.current);
            }
            return prev;
          });
        }, 1 * 1000);
      }
    };

    handleTimer(questions[activeQuestion]?.timer);

    return () => {
      clearInterval(timeRef.current);
    };
  }, [activeQuestion]);

  return (
    <div className={styles.container}>
      {submit ? (
        <div className={styles.completeContainer}>
          <div className={styles.completeQuiz}>Congrats Quiz is completed</div>
          <img src={trophy} alt="" className={styles.trophy} />
          <div
            className={styles.completeQuiz}
          >{`Your score is ${score} / ${questions.length}`}</div>
        </div>
      ) : (
        <div className={styles.questionContainer}>
          <div className={styles.topContainer}>
            <span className="">{`${activeQuestion + 1} / ${
              questions.length
            }`}</span>
            {questions[activeQuestion]?.timer > 0 && (
              <span className={styles.timer}>00:{timelimit}s</span>
            )}
          </div>
          <h2 className={styles.question}>
            {questions[activeQuestion]?.question}
          </h2>
          <div className={styles.optionContainer}>
            {questions[activeQuestion]?.options.map((item, idx) => (
              <div
                key={item._id}
                className={`${styles.option} ${
                  `option${idx + 1}` === selectedOption && styles.activeOption
                }`}
                onClick={() => handleSelect(idx)}
              >
                {item.text && <div className={styles.text}>{item.text}</div>}
                {item.image && (
                  <img src={item.image} className={styles.image} />
                )}
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
export default Qaquiz;
