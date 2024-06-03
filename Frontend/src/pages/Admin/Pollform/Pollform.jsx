import React, { act } from "react";
import Modal from "../../../components/Modal/Modal";
import styles from "./Pollform.module.css";
import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { RiDeleteBin5Line } from "react-icons/ri";
import Usercontext from "../../../Context/Usercontext.js";
import { toast } from "react-hot-toast";
import { createpoll, updatePoll } from "../../../api/Poll.api.js";
import Sharequizmodal from "../../../components/Sharequiz/Sharequizmodal.jsx";
const Pollform = () => {
  const {
    quiztype,
    inputdata,
    setInputdata,
    setQuiztype,
    setQuizcreated,
    setShowmodal,
    modal,
    editItem,
    setEditItem,
    isedit,
    setisEdit,
    shareid,
    setShareid,
  } = useContext(Usercontext);
  const [activequestion, setActivequestion] = useState(0);
  const [polldata, setPolldata] = useState({
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
      },
    ],
  });
  const handlequestion = (e) => {
    setPolldata((prevArr) => {
      const newArr = { ...prevArr }; // Create a copy of the array
      newArr.questions[activequestion] = {
        ...newArr.questions[activequestion],
        [e.target.name]: e.target.value,
      };
      return newArr;
    });
  };
  // console.log(polldata);
  const deltequestion = (e, id, index) => {
    e.stopPropagation();
    setPolldata((prevState) => ({
      ...prevState,
      questions: prevState.questions.filter((q) => q.id !== id),
    }));
    // console.log(index);
    setActivequestion(index);
    // setPolldata(updatedArr);
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
    };
    setPolldata((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, newquestion],
    }));
    setActivequestion(polldata.questions.length);
  };

  const gotoactiveclass = (index) => {
    // console.log(index);
    setActivequestion(index);
  };

  const handleOptionChange = (e, questionId) => {
    const newOptionsType = e.target.name;
    setPolldata((prev) => ({
      ...prev,
      questions: prev.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              optionsType: newOptionsType,
              options: [
                { id: uuidv4(), text: "", image: "" },
                { id: uuidv4(), text: "", image: "" },
              ],
            }
          : question
      ),
    }));
    // console.log(newOptionsType);
  };
  const handleaddoptions = () => {
    setPolldata((prevData) => {
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
    if (polldata?.questions[activequestion]?.options.length > 2) {
      setPolldata((prevData) => {
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
    setPolldata((prevData) => {
      const newArr = { ...prevData };
      newArr.questions[activequestion] = {
        ...newArr.questions[activequestion],
        options: newArr.questions[activequestion].options.map((option) => {
          if (isedit === "edit" && option._id === optionId) {
            console.log(option._id, optionId);
            return {
              ...option,
              [e.target.name]: e.target.value,
            };
          } else if (option.id === optionId) {
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

  //create logic
  const handleSubmit = async () => {
    if (!polldata.category || !polldata.title) {
      toast.error("Category and title are required.");
      return;
    }

    for (const question of polldata.questions) {
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
          ))
      ) {
        toast.error(
          "All fields for each question must be filled according to the question type."
        );
        return;
      }
    }
    const data = await createpoll(polldata);
    // console.log(data.poll._id);
    setQuizcreated(true);
    setShowmodal("share");
    setShareid(data.poll._id);
    // setQuiztype("");
    setInputdata("");
  };

  //update logic
  const handleupdate = async () => {
    if (!polldata.category || !polldata.title) {
      toast.error("Category and title are required.");
      return;
    }

    for (const question of polldata.questions) {
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
          ))
      ) {
        toast.error(
          "All fields for each question must be filled according to the question type."
        );
        return;
      }
    }
    // console.log(polldata);
    await updatePoll(polldata);
    setShowmodal("");
    setQuizcreated(true);
    setQuiztype("");
    setInputdata("");
  };
  const fetchdata = () => {
    setPolldata(editItem);
  };
  useEffect(() => {
    {
      isedit === "edit" ? fetchdata() : "";
    }
  }, [editItem]);
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
            {polldata?.questions?.map((item, index) => (
              <div
                className={`${styles.questionno} ${
                  activequestion === index ? styles.activeclass : ""
                }`}
                key={item.id}
                onClick={() => gotoactiveclass(index)}
              >
                <span>{index + 1}</span>
                {isedit !== "edit" && index + 1 > 1 ? (
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
            {isedit !== "edit" && polldata?.questions?.length < 5 ? (
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
                placeholder="Poll Questions"
                value={polldata?.questions[activequestion].question}
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
                    polldata?.questions[activequestion]?.optionsType === "text"
                  }
                  className={styles.radioInput}
                  onChange={(e) =>
                    handleOptionChange(
                      e,
                      isedit === "edit"
                        ? polldata?.questions[activequestion]._id
                        : polldata?.questions[activequestion].id
                    )
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
                    polldata?.questions[activequestion]?.optionsType === "url"
                  }
                  className={styles.radioInput}
                  onChange={(e) =>
                    handleOptionChange(
                      e,
                      isedit === "edit"
                        ? polldata?.questions[activequestion]._id
                        : polldata?.questions[activequestion].id
                    )
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
                    polldata?.questions[activequestion]?.optionsType ===
                    "textandurl"
                  }
                  className={styles.radioInput}
                  onChange={(e) =>
                    handleOptionChange(
                      e,
                      isedit === "edit"
                        ? polldata?.questions[activequestion]._id
                        : polldata?.questions[activequestion].id
                    )
                  }
                />
                <label htmlFor="option3" className={styles.radioLabel}>
                  Text & Image URL
                </label>
              </div>
            </div>
            <div style={{ display: "flex", position: "relative" }}>
              <div className={styles.optionwrapper}>
                {polldata &&
                  polldata?.questions[activequestion]?.options?.map(
                    (item, index) => (
                      <div
                        className={styles.inputcontaineroptions}
                        key={item.id}
                      >
                        {/* {console.log(item)} */}
                        {/* <input type="radio" name="options" id={index} /> */}
                        <div className={styles.inputcontainerwrapper1}>
                          <label htmlFor={index}>
                            {polldata?.questions[activequestion]
                              ?.optionsType === "text" && (
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
                                    handleInputChange(
                                      e,
                                      isedit === "edit" ? item?._id : item.id
                                    )
                                  }
                                />
                                {isedit !== "edit" && index > 1 && (
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
                            {polldata?.questions[activequestion]
                              ?.optionsType === "url" && (
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
                                    handleInputChange(
                                      e,
                                      isedit === "edit" ? item?._id : item.id
                                    )
                                  }
                                />
                                {isedit !== "edit" && index > 1 && (
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

                            {polldata.questions[activequestion]?.optionsType ===
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
                                        handleInputChange(
                                          e,
                                          isedit === "edit"
                                            ? item?._id
                                            : item.id
                                        )
                                      }
                                    />
                                    <input
                                      name="image"
                                      placeholder="imageurl"
                                      value={item.image}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          isedit === "edit"
                                            ? item?._id
                                            : item.id
                                        )
                                      }
                                    />
                                  </div>
                                  {isedit !== "edit" && index > 1 && (
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
                {isedit !== "edit" &&
                polldata?.questions[activequestion]?.options?.length < 4 ? (
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
            </div>
          </div>
        </div>
        <div className={styles.actionbuttoncontainer}>
          <button className={styles.actionbutton1} onClick={cancelpoll}>
            Cancel
          </button>
          {isedit !== "edit" ? (
            <button className={styles.actionbutton2} onClick={handleSubmit}>
              Create Quiz
            </button>
          ) : (
            <button className={styles.actionbutton2} onClick={handleupdate}>
              Update Quiz
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Pollform;
