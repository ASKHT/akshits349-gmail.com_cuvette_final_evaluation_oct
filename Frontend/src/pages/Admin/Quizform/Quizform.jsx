import React, { act } from "react";
import Modal from "../../../components/Modal/Modal";
import styles from "./Quizform.module.css";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import Usercontext from "../../../Context/Usercontext.js";
import { createquiz } from "../../../api/Quiz.api.js";
const Quizform = ({ setShowmodal }) => {
  const { quiztype, inputdata, setInputdata, setQuiztype, setQuizcreated } =
    useContext(Usercontext);
  const [activequestion, setActivequestion] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [data, setData] = useState({
    category: quiztype,
    title: inputdata,
    questions: [
      {
        id: uuidv4(),
        question: "",
        optionsType: "text",
        options: [
          { id: uuidv4(), text: "", image: "" },
          { id: uuidv4(), text: "", image: "" },
        ],
        answer: "",
        timer: "OFF",
      },
    ],
  });
  const handlequestion = (e) => {
    setData((prevArr) => {
      const newArr = { ...prevArr }; // Create a copy of the array
      newArr.questions[activequestion] = {
        ...newArr.questions[activequestion],
        [e.target.name]: e.target.value,
      };
      return newArr;
    });
  };
  // console.log(data);
  const deltequestion = (e, id, index) => {
    e.stopPropagation();
    setData((prevState) => ({
      ...prevState,
      questions: prevState.questions.filter((q) => q.id !== id),
    }));
    console.log(index);
    setActivequestion(index);
    // setData(updatedArr);
  };
  const handleaddquestions = () => {
    const newquestion = {
      id: uuidv4(),
      question: "",
      optionsType: "text",
      options: [
        { id: uuidv4(), text: "", image: "" },
        { id: uuidv4(), text: "", image: "" },
      ],
      answer: "",
      timer: "OFF",
    };
    setData((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, newquestion],
    }));
    setActivequestion(data.questions.length);
  };

  const gotoactiveclass = (index) => {
    setActivequestion(index);
  };

  const handleOptionChange = (e, questionId) => {
    const newOptionsType = e.target.name;
    setData((prev) => ({
      ...prev,
      questions: prev.questions.map((question) =>
        question.id === questionId
          ? { ...question, optionsType: newOptionsType }
          : question
      ),
    }));
    // console.log(newOptionsType);
  };
  const handleaddoptions = () => {
    setData((prevData) => {
      const newOptions = [
        ...prevData.questions[activequestion].options,
        { id: uuidv4(), text: "", image: "" },
      ];
      const updatedQuestions = prevData.questions.map((question, index) => {
        if (index === activequestion) {
          return { ...question, options: newOptions };
        }
        return question;
      });
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleDeleteOption = (optionId) => {
    if (data?.questions[activequestion]?.options.length > 2) {
      setData((prevData) => {
        const filteredOptions = prevData.questions[
          activequestion
        ]?.options.filter((option) => option.id !== optionId);
        const updatedQuestions = prevData.questions.map((question, index) => {
          if (index === activequestion) {
            return { ...question, options: filteredOptions };
          }
          return question;
        });
        return { ...prevData, questions: updatedQuestions };
      });
    }
  };
  const handleInputChange = (e, optionId) => {
    setData((prevData) => {
      const newArr = { ...prevData };
      newArr.questions[activequestion] = {
        ...newArr.questions[activequestion],
        options: newArr.questions[activequestion].options.map((option) => {
          if (option.id === optionId) {
            return {
              ...option,
              [e.target.name]: e.target.value,
            };
          }
          return option;
        }),
      };
      return newArr;
    });
  };
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
  const handleOptionSelect = (e, optionId) => {
    setData((prevArr) => {
      const newArr = { ...prevArr }; // Create a copy of the array
      newArr.questions[activequestion] = {
        ...newArr.questions[activequestion],
        answer: e.target.value,
      };
      return newArr;
    });
  };

  const handleSubmit = async () => {
    if (!data.category || !data.title) {
      toast.error("Category and title are required.");
      return;
    }

    for (const question of data.questions) {
      if (
        !question.question ||
        !question.optionsType ||
        (question.optionsType === "text" &&
          question.options.some((option) => option.text === "")) ||
        (question.optionsType === "url" &&
          question.options.some((option) => option.image === "")) ||
        (question.optionsType === "textandurl" &&
          question.options.some(
            (option) => option.text === "" || option.image === ""
          )) ||
        !question.answer ||
        !question.timer
      ) {
        toast.error(
          "please fill all fields for each question with answer select also"
        );
        return;
      }
    }
    await createquiz(data);
    setQuizcreated(true);
    setShowmodal("");
    setQuiztype("");
    setInputdata("");
  };
  const cancelpoll = () => {
    setShowmodal("");
    setQuiztype("");
    setInputdata("");
  };
  return (
    <Modal
      setShowmodal={setShowmodal}
      setQuiztype={setQuiztype}
      setInputdata={setInputdata}
    >
      <div className={styles.Quizmodalwrapper}>
        <div className={styles.questionwrapper}>
          <div className={styles.questiontabs}>
            {data?.questions?.map((item, index) => (
              <div
                className={`${styles.questionno} ${
                  activequestion === index ? styles.activeclass : ""
                }`}
                key={item.id}
                onClick={() => gotoactiveclass(index)}
              >
                <span>{index + 1}</span>
                {index + 1 > 1 ? (
                  <div
                    className={styles.crossbutton}
                    onClick={(e) => deltequestion(e, item.id, index - 1)}
                  >
                    x
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
            {data?.questions?.length < 5 ? (
              <div
                onClick={handleaddquestions}
                style={{ cursor: "pointer", fontSize: "45px", color: "gray" }}
              >
                +
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <span style={{ color: "gray" }}>Max 5 questions</span>
          </div>
        </div>
        <div className={styles.inputcontainerwrapper}>
          <div className={styles.wrapper}>
            <div className={styles.inputcontainer}>
              <input
                type="text"
                name="question"
                className={styles.input}
                placeholder="Quiz Questions"
                value={data?.questions[activequestion].question}
                onChange={(e) => handlequestion(e)}
              />
            </div>
            <div className={styles.choiceType}>
              <div className="choiceText">Option Type </div>
              <div className={styles.radioContainer}>
                <input
                  type="radio"
                  id="option1"
                  name="text"
                  checked={
                    data?.questions[activequestion]?.optionsType === "text"
                  }
                  className={styles.radioInput}
                  onChange={(e) =>
                    handleOptionChange(e, data?.questions[activequestion].id)
                  }
                />
                <label htmlFor="option1" className={styles.radioLabel}>
                  Text
                </label>
              </div>
              <div className={styles.radioContainer}>
                <input
                  type="radio"
                  id="option2"
                  name="url"
                  checked={
                    data?.questions[activequestion]?.optionsType === "url"
                  }
                  className={styles.radioInput}
                  onChange={(e) =>
                    handleOptionChange(e, data?.questions[activequestion]?.id)
                  }
                />
                <label htmlFor="option2" className={styles.radioLabel}>
                  Image URL
                </label>
              </div>
              <div className={styles.radioContainer}>
                <input
                  type="radio"
                  id="option3"
                  name="textandurl"
                  checked={
                    data?.questions[activequestion]?.optionsType ===
                    "textandurl"
                  }
                  className={styles.radioInput}
                  onChange={(e) =>
                    handleOptionChange(e, data?.questions[activequestion].id)
                  }
                />
                <label htmlFor="option3" className={styles.radioLabel}>
                  Text & Image URL
                </label>
              </div>
            </div>
            <div style={{ display: "flex", position: "relative" }}>
              <div className={styles.optionwrapper}>
                {data &&
                  data?.questions[activequestion]?.options?.map(
                    (item, index) => (
                      <div
                        className={styles.inputcontaineroptions}
                        key={item.id}
                      >
                        {/* {console.log(item)} */}
                        <input
                          type="radio"
                          id={index}
                          value={`option${index + 1}`}
                          checked={
                            data?.questions[activequestion].answer ===
                            `option${index + 1}`
                          }
                          onChange={(e) => handleOptionSelect(e, item.id)}
                        />

                        <div className={styles.inputcontainerwrapper1}>
                          <label htmlFor={index}>
                            {data?.questions[activequestion]?.optionsType ===
                              "text" && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <input
                                  type="text"
                                  placeholder="Text"
                                  name="text"
                                  value={item.text}
                                  onChange={(e) =>
                                    handleInputChange(e, item?.id)
                                  }
                                  className={`${
                                    data?.questions[activequestion]?.answer ===
                                    `option${index + 1}`
                                      ? styles.correctanswer
                                      : ""
                                  }`}
                                />

                                {index > 1 && (
                                  <RiDeleteBin5Line
                                    style={{
                                      fontSize: "1.5rem",
                                      color: "red",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleDeleteOption(item.id)}
                                  />
                                )}
                              </div>
                            )}
                            {data?.questions[activequestion]?.optionsType ===
                              "url" && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <input
                                  name="image"
                                  placeholder="imageurl"
                                  value={item.image}
                                  onChange={(e) =>
                                    handleInputChange(e, item?.id)
                                  }
                                  className={`${
                                    data?.questions[activequestion]?.answer ===
                                    `option${index + 1}`
                                      ? styles.correctanswer
                                      : ""
                                  }`}
                                />
                                {index > 1 && (
                                  <RiDeleteBin5Line
                                    style={{
                                      fontSize: "1.5rem",
                                      color: "red",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleDeleteOption(item.id)}
                                  />
                                )}
                              </div>
                            )}

                            {data.questions[activequestion]?.optionsType ===
                              "textandurl" && (
                              <div className={styles.textandimagecotainer}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "1rem",
                                    }}
                                  >
                                    <input
                                      name="text"
                                      placeholder="Text"
                                      value={item.text}
                                      onChange={(e) =>
                                        handleInputChange(e, item?.id)
                                      }
                                      className={`${
                                        data?.questions[activequestion]
                                          ?.answer === `option${index + 1}`
                                          ? styles.correctanswer
                                          : ""
                                      }`}
                                    />
                                    <input
                                      name="image"
                                      placeholder="imageurl"
                                      value={item.image}
                                      onChange={(e) =>
                                        handleInputChange(e, item?.id)
                                      }
                                      className={`${
                                        data?.questions[activequestion]
                                          ?.answer === `option${index + 1}`
                                          ? styles.correctanswer
                                          : ""
                                      }`}
                                    />
                                  </div>
                                  {index > 1 && (
                                    <RiDeleteBin5Line
                                      style={{
                                        fontSize: "1.5rem",
                                        color: "red",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        handleDeleteOption(item.id)
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    )
                  )}
                {data?.questions[activequestion]?.options?.length < 4 ? (
                  <button
                    className={styles.addoptionbutton}
                    onClick={handleaddoptions}
                  >
                    Add options
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.timerwrapper}>
                <div className={styles.timer}>
                  <div>Timer</div>
                  <div
                    className={`${
                      data?.questions[activequestion]?.timer === "OFF" // Condition
                        ? styles.buttontimeractive // If condition is true
                        : styles.buttontimer // If condition is false
                    }`}
                    onClick={() => handletimer("OFF")} // Pass the value directly
                  >
                    <p> OFF</p>
                  </div>
                  <div
                    className={`${
                      data?.questions[activequestion]?.timer === "5" // Condition
                        ? styles.buttontimeractive // If condition is true
                        : styles.buttontimer // If condition is false
                    }`}
                    onClick={() => handletimer("5")} // Pass the value directly
                  >
                    <p>5 sec</p>
                  </div>
                  <div
                    className={`${
                      data?.questions[activequestion]?.timer === "10" // Condition
                        ? styles.buttontimeractive // If condition is true
                        : styles.buttontimer // If condition is false
                    }`}
                    onClick={() => handletimer("10")} // Pass the value directly
                  >
                    <p>10 sec</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actionbuttoncontainer}>
          <button className={styles.actionbutton1} onClick={cancelpoll}>
            Cancel
          </button>
          <button className={styles.actionbutton2} onClick={handleSubmit}>
            Create quiz
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Quizform;
