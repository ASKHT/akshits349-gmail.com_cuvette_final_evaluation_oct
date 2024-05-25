import React, { useEffect, useRef } from "react";
import styles from "./Quizform.module.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import Timer from "./Timer.jsx";
const Quizoptions = ({ data, setData, activequestion, optiontype }) => {
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
    // const { name, value } = e.target;
    // console.log(e.target.value);
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

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.inputcontainer}>
          <input
            type="text"
            className={styles.input}
            placeholder="Quiz Questions"
          />
        </div>
        <div className={styles.choiceType}>
          <div className="choiceText">Option Type </div>
          <div className={styles.radioContainer}>
            <input
              type="radio"
              id="option1"
              name="text"
              checked={data?.questions[activequestion]?.optionsType === "text"}
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
              checked={data?.questions[activequestion]?.optionsType === "url"}
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
                data?.questions[activequestion]?.optionsType === "textandurl"
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
        <div className={styles.optionwrapper}>
          {data &&
            data?.questions[activequestion]?.options?.map((item, index) => (
              <div className={styles.inputcontaineroptions} key={item.id}>
                {/* {console.log(item)} */}
                <input type="radio" name="options" id={index} />
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
                          onChange={(e) => handleInputChange(e, item?.id)}
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
                    {data?.questions[activequestion]?.optionsType === "url" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <input name="image" placeholder="imageurl" />
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
                            <input placeholder="Text" />
                            <input placeholder="imageurl" />
                          </div>
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
                      </div>
                    )}
                  </label>
                </div>
              </div>
            ))}
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
      </div>
      <Timer />
    </>
  );
};

export default Quizoptions;
