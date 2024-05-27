import { useState } from "react";
import Usercontext from "./Usercontext.js";

const Usercontextprovider = ({ children }) => {
  const [quiztype, setQuiztype] = useState("");
  const [inputdata, setInputdata] = useState("");
  const [optiontype, setOptiontype] = useState("text");
  const [quizcreated, setQuizcreated] = useState(false);
  return (
    <Usercontext.Provider
      value={{
        quiztype,
        setQuiztype,
        inputdata,
        setInputdata,
        optiontype,
        setOptiontype,
        quizcreated,
        setQuizcreated,
      }}
    >
      {children}
    </Usercontext.Provider>
  );
};

export default Usercontextprovider;
